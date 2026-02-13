/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './client/**/*.{js,ts,jsx,tsx}',
    './server/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        gold: '#D4AF37',
        obsidian: '#0A0A0A',
        titanium: '#E5E5E5'
      },
      boxShadow: {
        'gold': '0 10px 40px rgba(212, 175, 55, 0.15)'
      }
    }
  },
  plugins: []
}