/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        vollkorn: ["Vollkorn", "serif"],
        righteous: ["Righteous", "sans-serif"],
        yeseva: ["Yeseva One", "sans-serif"],
      },
      colors: {
        primary: "#0085FF",
        green: "#4caf50",
        blue: {
          100: "#F2F8FF",
          200: "#CCE1FF",
          300: "#99C8FF",
          400: "#66B2FF",
          500: "#369BFF",
          600: "#0085FF",
          700: "#0072E6",
          800: "#005DC0",
          900: "#004799",
          1000: "#002B66",
        },
      },
    },
  },
  plugins: [],
};
