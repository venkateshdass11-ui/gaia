/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gaia: {
          forest: '#2F5D3A',      // Primary: Header, buttons, key headings
          leaf: '#7A9F4F',        // Secondary: Icons, veg badges, hover states
          cream: '#F6F1E4',       // Background: Page background, cards
          creamLight: '#FCFAF5',  // Lighter cream for subtle card fills
          terracotta: '#C8643B',  // Accent: CTA "Book a Table", highlights
          terracottaDark: '#B4532E',
          gold: '#C9A24B',        // Premium accent: Dividers, stars, awards
          charcoal: '#23291F',    // Deep Charcoal text
          nightOlive: '#1B2A1F',  // Dark surface: Footer, hero overlays
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
