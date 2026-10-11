/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f3f1ff",
          100: "#e9e5ff",
          200: "#d5ceff",
          300: "#b6a6ff",
          400: "#9274ff",
          500: "#7344fb",
          600: "#6326f2",
          700: "#5419d6",
          800: "#4616ae",
          900: "#3b158e",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)",
        lift: "0 12px 40px rgba(16,24,40,0.12)",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        popIn: {
          from: { opacity: 0, transform: "scale(0.96) translateY(6px)" },
          to: { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        heartBurst: {
          "0%": { opacity: 0, transform: "scale(0.4)" },
          "25%": { opacity: 1, transform: "scale(1.15)" },
          "60%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(1.1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        popIn: "popIn 0.22s ease-out",
        heartBurst: "heartBurst 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
