/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      prefix: "kr",
      themes: {
        light: {
          colors: {
            text: {
              DEFAULT: "#141414",
            },
            background: {
              DEFAULT: "#ffffff",
              50: "#f2f2f2",
              100: "#e6e6e6",
              200: "#cccccc",
              300: "#b3b3b3",
              400: "#999999",
              500: "#808080",
              600: "#666666",
              700: "#4d4d4d",
              800: "#333333",
              900: "#1a1a1a",
            },
            primary: {
              DEFAULT: "#35155b",
              50: "#f1eafa",
              100: "#e4d5f6",
              200: "#c9acec",
              300: "#ae82e3",
              400: "#9359d9",
              500: "#772fd0",
              600: "#6026a6",
              700: "#481c7d",
              800: "#301353",
              900: "#18092a",
            },
            secondary: {
              DEFAULT: "#c6d4ed",
              50: "#ecf0f9",
              100: "#d8e2f3",
              200: "#b1c5e7",
              300: "#8ba8da",
              400: "#648bce",
              500: "#3d6ec2",
              600: "#31589b",
              700: "#254274",
              800: "#182c4e",
              900: "#0c1627",
            },
            accent: {
              DEFAULT: "#4573c4",
              50: "#ecf0f9",
              100: "#d8e2f3",
              200: "#b1c5e7",
              300: "#8ba8da",
              400: "#648bce",
              500: "#3d6ec2",
              600: "#31589b",
              700: "#254274",
              800: "#182c4e",
              900: "#0c1627",
              GLASS: "rgba(69, 115, 196, 0.10)",
            },
            shopee: {
              DEFAULT: "rgb(208, 1, 27)",
            },
          },
        },
      },
    }),
  ],
};
