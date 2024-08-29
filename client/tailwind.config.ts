import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: '#EDE8E7', // Adjusted to proper singular color value
        secondary: '#5D4A46', // Adjusted to proper singular color value
        black: "#141314",
        white: "#fefefe",
        button: '#9F847F',
        buttonHover: '#806560',
        
        customActiveIcon: '#5D4A46',  // Example custom filled color
        customIcon: '#5D4A46',  // Example custom outline color

        customBlue: {
          light: '#3a86ff',
          DEFAULT: '#3a68ff',
          dark: '#2654bf',
        },

        customRed: {
          light: '#ff6f61',
          DEFAULT: '#ff4c4c',
          dark: '#bf3636',
        },

        aspectRatio: {
          normal: '3 / 4',
        },
      },
    },
  },
  plugins: [],
};

export default config;
