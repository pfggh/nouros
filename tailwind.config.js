/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nuros: {
          bg: '#0B0E14',
          card: '#131822',
          cardHover: '#1A212F',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          goldGlow: '#FFD700',
          crimson: '#E53935',
          crimsonDark: '#991B1B',
          redAccent: '#DC2626',
          textMuted: '#9CA3AF',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'red-glow': '0 0 20px rgba(229, 57, 53, 0.3)',
        'card-lux': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF0B9 0%, #D4AF37 50%, #AA7C11 100%)',
        'crimson-gradient': 'linear-gradient(135deg, #EF4444 0%, #E53935 50%, #991B1B 100%)',
      }
    },
  },
  plugins: [],
}
