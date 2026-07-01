/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '640px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        // Legacy tokens (kept for compatibility during migration)
        primary: {
          50: '#E8F0F8',
          100: '#D1E1F1',
          200: '#A3C3E3',
          300: '#75A5D5',
          400: '#4787C7',
          500: '#1E3A5F',
          600: '#18304D',
          700: '#12263B',
          800: '#0C1C2A',
          900: '#06121D',
        },
        surface: '#F8FAFC',
        // New design tokens: refined book / education aesthetic
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          DEFAULT: '#b91c1c',
          light: '#fca5a5',
          dark: '#991b1b',
          50: '#fef2f2',
          100: '#fee2e2',
        },
        paper: {
          DEFAULT: '#fafaf9',
          dark: '#f5f5f4',
          border: '#e7e5e4',
        },
        ink: {
          DEFAULT: '#1c1917',
          muted: '#78716c',
          subtle: '#a8a29e',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Songti SC"', '"STSong"', '"SimSun"', 'serif'],
      },
    },
  },
  plugins: [],
}
