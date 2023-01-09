/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      primary: "#FF9E2C",
      white: "#FFFFFF",
      offWhite: "#F5F5F5",
      dark: "#1F1F1F",
      secondary: "#F8F8F8",
      disabled: "#C7C7C7",
      danger: "#FE5F5F",
      success: "#2FC750",
      grey: "#808080",
      darkGrey: "#8F8F8F",
      lightGrey: "#D2D2D2",
      davyGrey: "#BCBCBC",
      royalBlue: "#1E8EF5",
    },
  },
  plugins: [],
};
