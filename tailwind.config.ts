import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Channel-based tokens so opacity modifiers (bg-ink/70) keep working
           while the actual values are swapped per theme via CSS variables. */
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          soft: 'rgb(var(--c-ink-soft) / <alpha-value>)',
          raise: 'rgb(var(--c-ink-raise) / <alpha-value>)'
        },
        bone: {
          DEFAULT: 'rgb(var(--c-bone) / <alpha-value>)',
          dim: 'rgb(var(--c-bone-dim) / <alpha-value>)'
        },
        volt: {
          DEFAULT: 'rgb(var(--c-volt) / <alpha-value>)',
          dim: 'rgb(var(--c-volt-dim) / <alpha-value>)'
        },
        brand: {
          DEFAULT: 'rgb(var(--c-brand) / <alpha-value>)',
          /* brighter tint for small text / thin elements on dark ink */
          bright: 'rgb(var(--c-brand-bright) / <alpha-value>)'
        },
        line: 'var(--c-line)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif']
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'spin-slow': 'spin-slow 14s linear infinite'
      }
    }
  },
  plugins: [],
} satisfies Config;
