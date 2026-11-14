/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paint: {
          surface: '#FAF6F5',
          surfaceAlt: '#F4ECE9',
          charcoal: '#1A0A07',
          charcoalSoft: '#2B1410',
          muted: '#6F5955',
          border: '#E6D8D4',
          ochre: '#BD3218',
          terracotta: '#821400',
          sage: '#457B63',
          forest: '#264653',
          sunshine: '#E05A3E',
          sky: '#A72B15',
          indigo: '#4A0D03',
          clay: '#821400',
          linen: '#EBE2D5',
          crimson: '#821400',
          crimsonLight: '#FDECE9',
          crimsonDark: '#5E0E00',
          crimsonDeep: '#1A0A07',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(26, 10, 7, 0.05)',
        'card': '0 10px 30px -4px rgba(26, 10, 7, 0.07), 0 4px 6px -2px rgba(26, 10, 7, 0.03)',
        'card-hover': '0 20px 40px -6px rgba(130, 20, 0, 0.16), 0 8px 12px -3px rgba(26, 10, 7, 0.05)',
        'swatch': '0 6px 16px -2px rgba(26, 10, 7, 0.12)',
        'swatch-hover': '0 16px 32px -4px rgba(130, 20, 0, 0.24)',
        'floating': '0 20px 50px -10px rgba(26, 10, 7, 0.20)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
