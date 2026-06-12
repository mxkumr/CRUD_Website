import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D0D0B',
          soft: '#151513',
          raise: '#1C1C19'
        },
        bone: {
          DEFAULT: '#EDEAE3',
          dim: '#9C988E'
        },
        volt: {
          DEFAULT: '#D9FF3F',
          dim: '#A8C82E'
        },
        brand: {
          DEFAULT: '#D32F2F',
          /* brighter tint for small text / thin elements on dark ink */
          bright: '#FF5252'
        },
        line: 'rgba(237, 234, 227, 0.12)'
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
