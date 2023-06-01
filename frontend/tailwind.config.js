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
          secondary: "#3f89e2",
          accent: "#8188e8",
          neutral: "#1f2b33",
          "base-100": "#344451",
          info: "#92daf6",
          success: "#4ae88f",
          warning: "#f7b84a",
          error: "#fa6b88",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
