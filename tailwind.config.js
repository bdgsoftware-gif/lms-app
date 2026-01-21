/** @type {import('tailwindcss').Config} */
import { color } from "framer-motion";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "8xl": "88rem",
        "9xl": "96rem",
        "10xl": "104rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "10xl": "104rem",
      },
      fontFamily: {
        sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        cambay: ["Cambay", ...defaultTheme.fontFamily.sans],
        quantico: ["Quantico", ...defaultTheme.fontFamily.sans],
        bengali: ['"Noto Sans Bengali"', ...defaultTheme.fontFamily.sans],
      },
      wordSpacing: {
        normal: "normal",
        wide: "0.025em",
        wider: "0.05em",
        "3px": "3px",
      },
      colors: {
        brand: {
          primary: "#2F7C74",
          accent: "#E0B321",
          premium: "#F49904",
        },
        text: {
          primary: "#1F2A24",
          secondary: "#5E6F68",
          inverse: "#FFFFFF",
        },
        surface: {
          base: "#FFFFFF",
          soft: "#F4F8F7",
          dark: "#102B29",
        },
        border: {
          subtle: "#E8EFEF",
        },
        feedback: {
          success: "#16A34A",
          danger: "#DC2626",
          warning: "#F59E0B",
        },
        button: {
          primary: "#2F7C74",
          accent: "#27665f",
        },
        bg: {
          light: "#FBFEFB",
          card: "#EAF2F1",
          primary: "#102B29",
          accent: "#27665f",
        },
      },
      animation: {
        partners: "partners 25s linear infinite reverse",
      },
      keyframes: {
        partners: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
