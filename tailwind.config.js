/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Yurpass Design System v2
        // Couleur primaire = Bleu Yunicity (CTA, boutons, icônes actives)
        'yunicity': {
          'white': '#FFFFFF',   // Background principal
          'black': '#000000',   // Textes principaux
          'blue': '#1E40AF',    // COULEUR PRIMAIRE - CTA, boutons, tabs actifs
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
