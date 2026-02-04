/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "primary-cyan": "#00f5ff",
        "accent-violet": "#a855f7",
        "bg-deep-navy": "#0a0f1d",
        "bg-charcoal": "#121212",
        "background-light": "#f6f7f8",
        "background-dark": "#05070a",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
};
