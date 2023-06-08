/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e5965e",
          secondary: "#F9AE31",
          accent: "#8188e8",
          neutral: "#B3B7F1",
          "base-100": "#ffffff",
          info: "#BBEFF3",
          success: "#FBC976",
          warning: "#FCD28D",
          error: "#fa6b88",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
