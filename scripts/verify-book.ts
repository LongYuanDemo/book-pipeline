import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const baseUrl = 'http://127.0.0.1:4173';
  const results: string[] = [];

  try {
    // 首页
    await page.goto(baseUrl);
    await page.waitForLoadState('networkidle');
    const title = await page.locator('text=文本的越境与跨界').first().isVisible().catch(() => false);
    results.push(`首页显示书名: ${title ? '✅' : '❌'}`);

    const chapterCount = await page.locator('text=/\\d+ 个任务/').count();
    results.push(`首页章节（含任务标签）数量: ${chapterCount}`);

    // 通过桌面 TopNav 进入音频课页面
    await page.locator('header nav button', { hasText: '音频课' }).click();
    await page.waitForTimeout(800);

    const audioTitle = await page.locator('text=AI 音频课').first().isVisible().catch(() => false);
    results.push(`音频课页面标题: ${audioTitle ? '✅' : '❌'}`);

    const lessonCount = await page.locator('text=/第\\d+课：/').count();
    results.push(`音频课数量: ${lessonCount}`);

    const totalDuration = await page.locator('text=/总时长/').first().textContent().catch(() => 'unknown');
    results.push(`音频课总时长文本: ${totalDuration}`);

    // 点击第一课的播放按钮
    const playBtn = page.locator('button', { has: page.locator('svg') }).first();
    await playBtn.click();
    await page.waitForTimeout(2000);

    const audioState = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return audio ? { paused: audio.paused, duration: audio.duration, error: audio.error?.message || null } : null;
    });
    results.push(`音频状态: ${JSON.stringify(audioState)}`);

    // 验证 Anki 页面
    await page.locator('header nav button', { hasText: 'Anki卡片' }).click();
    await page.waitForTimeout(800);
    const ankiTitle = await page.locator('text=Anki').first().isVisible().catch(() => false);
    results.push(`Anki 页面标题: ${ankiTitle ? '✅' : '❌'}`);

    // 验证知识地图页面
    await page.locator('header nav button', { hasText: '知识地图' }).click();
    await page.waitForTimeout(800);
    const mindmapTitle = await page.locator('text=知识地图').first().isVisible().catch(() => false);
    results.push(`知识地图页面标题: ${mindmapTitle ? '✅' : '❌'}`);

    // 验证视频清单页面
    await page.locator('header nav button', { hasText: '视频清单' }).click({ force: true });
    await page.waitForTimeout(800);
    const checklistTitle = await page.locator('text=视频清单').first().isVisible().catch(() => false);
    results.push(`视频清单页面标题: ${checklistTitle ? '✅' : '❌'}`);

    // 截图
    await page.goto(baseUrl);
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/text-crossing-home.png', fullPage: false });

    await page.locator('header nav button', { hasText: '音频课' }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/text-crossing-audio.png', fullPage: false });

    results.push('截图已保存: /tmp/text-crossing-home.png, /tmp/text-crossing-audio.png');
  } catch (err) {
    results.push(`错误: ${err}`);
  } finally {
    await browser.close();
  }

  console.log(results.join('\n'));
}

main();
