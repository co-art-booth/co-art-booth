import type { Config } from 'tailwindcss'

// Tokens mirror the Figma "Creatory Airy Palette" variables and text/effect styles.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B0F4F', deep: '#080B3A' },
        purple: { DEFAULT: '#7C5CFF', deep: '#5A3DE0', dark: '#3B25A8', soft: '#C9BBFF' },
        pink: { DEFAULT: '#F062C0', dark: '#C7409A' },
        orange: { DEFAULT: '#FFB24C', deep: '#FF9F2E' },
        canvas: '#F8F9FC',
        mist: '#EEE9FF',
        blush: '#FFF0FA',
        peach: '#FFF5E3',
        ink: { DEFAULT: '#0B0F4F', gray: '#6F7485', muted: '#9A9FB5', ondark: '#CFC9FF' },
        line: { DEFAULT: '#EBE7FB', strong: '#DDD5FF' },
        ok: { DEFAULT: '#17A673', tint: '#DCF5EA', text: '#0E7A52' },
        bad: { DEFAULT: '#E5484D', tint: '#FFE5E7', text: '#B4232A' },
        warn: { text: '#9A5B00' },
      },
      fontFamily: { sans: ['"Noto Sans Thai"', 'system-ui', 'sans-serif'] },
      fontSize: {
        hero: ['38px', { lineHeight: '1.25', fontWeight: '700' }],
        display: ['30px', { lineHeight: '1.25', fontWeight: '700' }],
        h1: ['20px', { lineHeight: '1.35', fontWeight: '700' }],
        h2: ['15px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['13px', { lineHeight: '1.5' }],
        small: ['11.5px', { lineHeight: '1.45' }],
        micro: ['10.5px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: { card: '20px', hero: '28px' },
      boxShadow: {
        card: '0 4px 16px rgba(90,61,224,.07)',
        raised: '0 14px 34px rgba(59,37,168,.14), 0 2px 6px rgba(59,37,168,.06)',
        'glow-purple': '0 8px 20px rgba(124,92,255,.38)',
        'glow-orange': '0 8px 20px rgba(255,178,76,.38)',
      },
      backgroundImage: {
        brand: 'linear-gradient(135deg,#5A3DE0 0%,#7C5CFF 50%,#F062C0 100%)',
        cta: 'linear-gradient(135deg,#FFB24C,#FF9F2E)',
        'cta-hover': 'linear-gradient(135deg,#FFC874,#FFB24C)',
        'cta-press': 'linear-gradient(135deg,#FF9F2E,#E8851A)',
        'g-purple': 'linear-gradient(135deg,#7C5CFF,#5A3DE0)',
        'g-pink': 'linear-gradient(135deg,#F062C0,#C7409A)',
        'g-orange': 'linear-gradient(135deg,#FFB24C,#FF9F2E)',
        'g-green': 'linear-gradient(135deg,#17A673,#0E8A60)',
        'g-red': 'linear-gradient(135deg,#E5484D,#B4232A)',
        sidebar: 'linear-gradient(180deg,#0B0F4F,#080B3A)',
        underline: 'linear-gradient(90deg,#7C5CFF,#F062C0 60%,#FFB24C)',
      },
    },
  },
  plugins: [],
} satisfies Config
