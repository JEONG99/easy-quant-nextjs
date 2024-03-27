import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        sidebar: "var(--sidebar-width)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
      },
      boxShadow: {
        DEFAULT: "0px 4px 10px 0px #00000026",
        tooltip: "4px 24px 20px 0px #00000026",
        hover: "0px 14px 10px 0px #00000026",
        modal: "0px 10px 20px 0px #00000040",
      },
      colors: {
        gray: {
          100: "#F7F7FA",
        },
        black: {
          100: "#6F6F6F",
          DEFAULT: "#484848",
        },
        purple: {
          50: "#dedbfd",
          100: "#6B5CFF",
          200: "#7857FC",
        },
        red: {
          100: "#FF5353",
        },
        blue: {
          100: "#4786FF",
        },
      },
      animation: {
        scaleUp: "scaleUp 1.2s ease-in-out",
      },
      keyframes: {
        scaleUp: {
          "0%": {
            transform: "scale(0)",
          },
          "80%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
