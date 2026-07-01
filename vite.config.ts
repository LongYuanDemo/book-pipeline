import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from 'http'
import { resolve } from 'path'
import { cpSync, existsSync, createReadStream, statSync, readFileSync } from 'fs'
import { config as loadEnv } from 'dotenv'

loadEnv()

function mermaidProxy() {
  return {
    name: 'mermaid-proxy',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url || !req.url.startsWith('/mermaid')) {
          return next()
        }
        const url = new URL(req.url, 'http://localhost:5173')
        const proxyReq = http.request(
          {
            hostname: '127.0.0.1',
            port: 3005,
            path: `/mermaid${url.search}`,
            method: 'GET',
          },
          (proxyRes: any) => {
            res.statusCode = proxyRes.statusCode || 200
            const ct = proxyRes.headers['content-type']
            if (ct) res.setHeader('Content-Type', ct)
            res.setHeader('Cache-Control', 'public, max-age=86400')
            proxyRes.pipe(res)
          }
        )
        proxyReq.on('error', (err: any) => {
          console.error('mermaid proxy error:', err.message)
          res.statusCode = 500
          res.end('Proxy error')
        })
        proxyReq.end()
      })
    },
  }
}

function copyBookAssets() {
  return {
    name: 'copy-book-assets',
    apply: 'build' as const,
    closeBundle() {
      const BOOK_ID = process.env.BOOK_ID || 'text-crossing-test'
      const srcDir = resolve(__dirname, `books/${BOOK_ID}/assets`)
      if (!existsSync(srcDir)) return
      const destDir = resolve(__dirname, 'dist')
      const subdirs = ['audio', 'video', 'video-frames']
      for (const sub of subdirs) {
        const src = resolve(srcDir, sub)
        if (existsSync(src)) {
          cpSync(src, resolve(destDir, sub === 'video' ? 'videos' : sub), { recursive: true })
        }
      }
    },
  }
}

const BOOK_ID = process.env.BOOK_ID || 'text-crossing-test'

function bookAssetsDev() {
  return {
    name: 'book-assets-dev',
    apply: 'serve' as const,
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url) return next()
        const url = new URL(req.url, 'http://localhost:5173')
        const pathname = url.pathname
        // Serve /audio/* and /videos/* from books/{BOOK_ID}/assets/
        const match = pathname.match(/^\/(audio|videos)(\/.+)$/)
        if (!match) return next()
        const subdir = match[1] === 'videos' ? 'video' : match[1]
        const filePath = resolve(__dirname, `books/${BOOK_ID}/assets/${subdir}${match[2]}`)
        if (!existsSync(filePath)) return next()
        const stat = statSync(filePath)
        res.setHeader('Content-Length', stat.size)
        res.setHeader('Cache-Control', 'public, max-age=86400')
        const ext = match[2].toLowerCase()
        if (ext.endsWith('.mp3')) res.setHeader('Content-Type', 'audio/mpeg')
        else if (ext.endsWith('.mp4')) res.setHeader('Content-Type', 'video/mp4')
        else if (ext.endsWith('.png')) res.setHeader('Content-Type', 'image/png')
        else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) res.setHeader('Content-Type', 'image/jpeg')
        createReadStream(filePath).pipe(res)
      })
    },
  }
}

function bookSkillApi() {
  return {
    name: 'book-skill-api',
    apply: 'serve' as const,
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url || !req.url.startsWith('/api/book-skill/chat')) {
          return next()
        }

        // Only handle POST
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        // Read request body
        let body = ''
        for await (const chunk of req) {
          body += chunk
        }

        let parsed: any
        try {
          parsed = JSON.parse(body)
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid JSON' }))
          return
        }

        const { question, bookId, history } = parsed
        if (!question) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Missing question' }))
          return
        }

        // Load book content for context
        const bookIdResolved = bookId || process.env.BOOK_ID || 'eye-ent-nursing'
        let bookContext = ''
        try {
          const sourceMdPath = resolve(__dirname, `books/${bookIdResolved}/source.md`)
          if (existsSync(sourceMdPath)) {
            const fullContent = readFileSync(sourceMdPath, 'utf-8')
            // Truncate to ~8000 chars to fit context window
            bookContext = fullContent.slice(0, 8000)
          }
        } catch (e) {
          console.warn('[book-skill] Failed to load book content:', e)
        }

        // Build messages for DeepSeek
        const systemPrompt = `你是一位教材学习助手，正在帮助学生学习一本医学教材。请基于以下教材内容回答问题，给出准确、有条理的回答。如果问题超出教材范围，请说明并尽力提供相关知识。

教材内容摘要：
${bookContext}

请用中文回答，保持专业但易懂的语言风格。回答时可以引用教材中的章节结构。`

        const messages = [
          { role: 'system', content: systemPrompt },
          ...(history || []).map((m: any) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
          { role: 'user', content: question },
        ]

        try {
          // Call DeepSeek API
          const apiKey = process.env.DEEPSEEK_API_KEY
          const model = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

          if (!apiKey) {
            // Fallback: return a helpful message
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              answer: '抱歉，技能服务尚未配置 API Key。请在 .env 文件中设置 DEEPSEEK_API_KEY 后重启服务。',
            }))
            return
          }

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 60000)

          const apiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model,
              messages,
              temperature: 0.7,
              max_tokens: 2000,
            }),
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (!apiRes.ok) {
            const errText = await apiRes.text()
            console.error('[book-skill] DeepSeek API error:', apiRes.status, errText)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'LLM API error', detail: errText }))
            return
          }

          const data: any = await apiRes.json()
          const answer = data.choices?.[0]?.message?.content || '抱歉，我无法生成回答。'

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ answer }))
        } catch (err: any) {
          console.error('[book-skill] Error:', err.message)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            answer: '抱歉，技能服务暂时不可用。请稍后再试。',
            error: err.message,
          }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    mermaidProxy(),
    bookAssetsDev(),
    bookSkillApi(),
    copyBookAssets(),
  ],
  resolve: {
    alias: {
      '@book': resolve(__dirname, `books/${BOOK_ID}`),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pipeline: resolve(__dirname, 'pipeline-trace.html'),
      },
    },
  }
})
