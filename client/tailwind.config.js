import tailwindcssAnimated from "tailwindcss-animated";
import "prettier-plugin-tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        21: "5.3125rem",
      },
      fontSize: {
        basicFont: "0.9375rem",
        l: "1.0625rem",
        xxs: "0.8125rem",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      boxShadow: {
        custom: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
      },
      gridTemplateColumns: {
        custom: "repeat(2, 194px)",
      },
      borderRadius: {
        "2xxl": "1.25rem",
      },
    },
  },
  plugins: [tailwindcssAnimated],
};
