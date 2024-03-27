/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'button': "#FFA52C",
        "signupBg": "#FFDDD3",
        "adminDashboard": "#E4E7F1",
        "user" : '#E7E7E7',
        "firstBox" : '#321fdb',
        "secondBox" : '#3299fe',
        "thirdBox" : '#f9b017',
        "fourthBox" : '#e45252',
        "signupFormBg" : '#fec800',
        "signupBorderColor": '#395a65',
        "signupBtn" : '#1b2e35',
        "navbarBg" : '#ffba08',
        "navbarBtns" : '#ff6700',
        "navbarHoverBtn" : '#ff9500',
      },
      backgroundImage: {
        'login': "url('/public/assets/abstract-blur-coffee-shop_1203-8297.jpg')",
        'signup': "url('/public/assets/abstract-blurred-people-night-festival-city-park-bokeh-background-vintage-tone.jpg')",
      }
    },
  },
  plugins: [], 
};
