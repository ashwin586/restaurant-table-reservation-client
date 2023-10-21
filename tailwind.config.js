/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'button': "#FFA52C",
        "signupBg": "#FFDDD3",
        "adminDashboard": "#E4E7F1",
        "user" : '#E7E7E7'
      },
    },
  },
  plugins: [],
};
