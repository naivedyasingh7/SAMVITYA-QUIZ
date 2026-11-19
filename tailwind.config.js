/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Space Grotesk"', 'Montserrat', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        dark: {
          950: '#030305',
          900: '#07070b',
          850: '#0c0c13',
          800: '#12121d',
          700: '#1b1b2a',
          600: '#28283d'
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F5F2EB',
          300: '#E8E4DA'
        },
        accent: {
          purple: '#9333ea',
          pink: '#f0abfc',
          magenta: '#ec4899',
          cyan: '#06b6d4',
          amber: '#fbbf24',
          violet: '#8b5cf6'
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' }
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        shine: 'shine 8s linear infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.12), transparent 45%)',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
