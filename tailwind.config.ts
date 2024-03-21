import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "0px 4px 10px 0px #00000026",
        hover: "0px 14px 10px 0px #00000026;",
      },
      colors: {
        black: {
          DEFAULT: "#484848",
        },
        purple: {
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
    },
  },
  plugins: [],
};
export default config;
