import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50:  "#fff0f5",
          100: "#ffe0ec",
          200: "#ffc1d9",
          300: "#ff93bb",
          400: "#ff5597",
          500: "#ff2277",
          600: "#f00060",
          700: "#cc004f",
          800: "#a80044",
          900: "#8c003c",
        },
        rose: {
          50:  "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
        petal: {
          light: "#fff5f8",
          soft:  "#fde8ef",
          mist:  "#fad0de",
        },
      },
      fontFamily: {
        display: ["var(--font-dancing)", "cursive"],
        body:    ["var(--font-nunito)", "sans-serif"],
      },
      animation: {
        "float-up":    "floatUp 6s ease-in infinite",
        "pulse-soft":  "pulseSoft 2s ease-in-out infinite",
        "wiggle":      "wiggle 0.4s ease-in-out",
        "fade-in-up":  "fadeInUp 0.6s ease-out forwards",
        "scale-in":    "scaleIn 0.4s ease-out forwards",
        "bounce-soft": "bounceSoft 1.2s ease-in-out infinite",
      },
      keyframes: {
        floatUp: {
          "0%":   { transform: "translateY(100vh) scale(0.5)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateY(-10vh) scale(1)", opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.05)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%":      { transform: "rotate(3deg)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.85)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        "glow-rose": "0 0 30px rgba(244, 63, 94, 0.25)",
        "glow-pink": "0 0 40px rgba(255, 85, 151, 0.2)",
        "card":      "0 4px 24px rgba(244, 63, 94, 0.08), 0 1px 6px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;