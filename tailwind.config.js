/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bisaText: '#1C1917',
        bisaTextSecondary: '#57534E',
        bisaTextMuted: '#A8A29E',
        bisaBg: '#FAFAF9',
        bisaBgSecondary: '#F5F5F4',
        bisaBgCard: '#FFFFFF',
        bisaBorder: '#E7E5E4',
        bisaBorderLight: '#F5F5F4',
        bisaExcellent: '#10B981',
        bisaGood: '#3B82F6',
        bisaDeveloping: '#F59E0B',
        bisaNeedsWork: '#EF4444',
        bisaXp: '#F59E0B',
        bisaStreak: '#EF4444',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
