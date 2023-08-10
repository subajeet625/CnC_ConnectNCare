/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
       primaryColor:"#0067FF",
        yellowColor:"#FEB60D",
        purpleColor:"#9771FF",
        irisBlueColor:"#01B5C5",
        headingColor:"#181AQ1E",
        textColor:"#4E545F"
      },
      boxShadow:{
        panelShadow:"rgba(17,12,46,0.15) 0px 48px 100px 0px;",
      }
    },
  },
  plugins: [],
}
