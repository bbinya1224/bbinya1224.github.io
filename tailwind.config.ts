import typography from "@tailwindcss/typography";

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
    },
    extend: {
      colors: {
        primary: "#171e23",
      },
      fontFamily: {
        apple: ["AppleSDGothicNeo-main", "sans-serif"],
        bitcount: ["Bitcount_Prop_Double_Ink", "monospace"],
      },
    },
  },
  plugins: [typography],
};
