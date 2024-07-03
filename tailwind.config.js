import Card from "@/components/infinitescrolleffect/Card";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        interTight: ["Inter Tight", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        productSans: ["Product Sans", "sans-serif"],
        montserrat:[ "Montserrat", "sans-serif"]
      },
      colors: {
        coarseWool: "#1d2130",
        retroBlue: "#316FF4",
        carbonColor: "#333333",
        trolleyGrey: "#828282",
        unity: "#274892",
        whiteSmoke: "#F2F2F2",
        kinglyCloud: "#E0E0E0",
        titaniumWhite: "#E5E5E5",
        fiftiethShadeOfGrey: "#4F4F4F",
        vaporBlue: "#BDBDBD",
        firstSnow: "#EBF0F9",
        ballGown: "#525560",
        eyelashViper: "#F2C94C",
        moonDust: "#E3E8F2",
        blackVelvet: "#232536",
        sweetEscape: "#9747FF",
        ruinedSmores: "#09090B",
        superSilver: "#EEEEEE",
        ghostWhite: "#F7F9FF",
        placeboColor: "#E7E7E7",
        liquidNitrogen: "#F4F4F5",
        shadowGargoyle: "#676767",
        hauntedDreams: "#313553",
        quicksilverColor: "#A6A6A6",
        carteBlanche: "#E7EBFF",
        floralWhite: "#FFFCF7",
      },
    },
  },
  plugins: [],
};
