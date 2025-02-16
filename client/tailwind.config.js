/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      vsm: "580px",
      sm: "900px",
      md: "1150px",
      lg: "1200px",
      xl: "1390px",
      xxl: "1600px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pri: "#F1CC7B",
        sec: "#393E46",
        acc: "#00ADB5",
        lightGray: "#DCDCDC",
        btnDark: "#D0A445",
      },
      fontFamily: {
        inter: "Inter",
      },
      fontSize: {
        sm: "0.8rem",
        md: "1rem",
        lg: "1.2rem",
        xl: "1.4rem",
        "2xl": "1.663rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
