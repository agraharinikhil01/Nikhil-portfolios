/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#8b5cf6",
        "primary-light": "#a78bfa",
        "primary-dark": "#7c3aed",
        surface: "#f4f6fb",
        card: "#ffffff",
        blob1: "#c7d2fe",
        blob2: "#bfdbfe",
      },
      animation: {
        blob: "blob 8s infinite",
        "blob-slow": "blob 12s infinite",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
}
