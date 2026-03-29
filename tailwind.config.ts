import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#edfbf8",
          100: "#c5f5ed",
          200: "#8eeade",
          300: "#50d8c8",
          400: "#22c4b0",
          500: "#10AF97",
          600: "#10AF97",
          700: "#0d9a87",
          800: "#0a7a6b",
          900: "#075e52",
        },
        navy: {
          50:  "#e8f0f5",
          100: "#c5d5e2",
          200: "#9ab5c8",
          300: "#6890ab",
          400: "#3d6f90",
          500: "#1f5475",
          600: "#0d4466",
          700: "#0A3D59",
          800: "#072e43",
          900: "#041f2e",
        },
        coral: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#10AF97",
              foreground: "#ffffff",
              50:  "#edfbf8",
              100: "#c5f5ed",
              200: "#8eeade",
              300: "#50d8c8",
              400: "#22c4b0",
              500: "#10AF97",
              600: "#10AF97",
              700: "#0d9a87",
              800: "#0a7a6b",
              900: "#075e52",
            },
            secondary: {
              DEFAULT: "#0A3D59",
              foreground: "#ffffff",
              50:  "#e8f0f5",
              100: "#c5d5e2",
              200: "#9ab5c8",
              300: "#6890ab",
              400: "#3d6f90",
              500: "#1f5475",
              600: "#0d4466",
              700: "#0A3D59",
              800: "#072e43",
              900: "#041f2e",
            },
            warning: {
              DEFAULT: "#f97316",
              foreground: "#ffffff",
            },
            background: "#ffffff",
            foreground: "#000000",
          },
        },
      },
    }),
  ],
};

export default config;
