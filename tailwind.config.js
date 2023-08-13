/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      boxShadow: {
        secondShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        primeShadow:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
      },

      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: "#dfe6e9",
        red: "#f33f3f",
        blue: "#0ea5e9",
        borderBarelyVisible: "#eee",
        lightGray: "#9a9a9a",
        lightGreen: "#22C71F",
        lightBlack: "#2d3436",
      },

      keyframes: {
        slider: {
          "0%": { opacity: "40" },
          "100%": { opacity: "100" },
        },
        onPageLoad: {
          "0%": {
            opacity: "0",
            transform: "translateX(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        slider: "slider 1s ease-in-out infinite",
        onPageLoad: "onPageLoad 0.5s ease-in 1",
      },
    },
  },
  plugins: [],
};
