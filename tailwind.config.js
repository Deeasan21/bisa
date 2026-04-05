/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — reference CSS variables for consistency
        bisa: {
          gold: 'var(--bisa-gold)',
          'gold-light': 'var(--bisa-gold-light)',
          'gold-dark': 'var(--bisa-gold-dark)',
          'gold-subtle': 'var(--bisa-gold-subtle)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        // Score colors
        excellent: 'var(--score-excellent)',
        good: 'var(--score-good)',
        developing: 'var(--score-developing)',
        'needs-work': 'var(--score-needs-work)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionTimingFunction: {
        'out': 'var(--ease-out)',
        'bounce': 'var(--ease-bounce)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
