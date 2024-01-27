// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
    
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: {
          50: "#f5f7fa",
          51: "#f0f4f8",
          52: "#ecf2f7",
          300: "#cbd5e1",
          400: "#a0aec0",
          401: "#97a6b5",
          600: "#4a5568",
          604: "#505d6b",
          700: "#434c5e",
          900: "#1a202c",
          "900_cc": "#1a202ccc",
        },
        deep_orange: {
          50: "#ebf5ff",
          300: "#4299e1",
          400: "#3182ce",
          900: "#1c3d5a",
        },
        red: { 100: "#cfe8ff", 101: "#ecd6c8" },
        bluegray: {
          100: "#d6d6d6",
          101: "#d9d9d9",
          102: "#cfcfcf",
          600: "#406f85",
          "300_33": "#91aebb33",
        },
        orange: { A700: "#0d47a1" },
        yellow: { 50: "#6998AB" },
        white: { A700: "#ffffff" },
      },
      fontFamily: { manrope: "Manrope"},
      boxShadow: { bs: "0px 30px  30px 0px #91aebb33" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});



// // tailwind.config.js
// module.exports = {
//   mode: 'jit',
//   content: [
//     "./index.html",
//     "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
//     "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
//   ],
//   darkMode: "class",
//   theme: {
//     screens: { md: { max: "1050px" }, sm: { max: "550px" } },
//     extend: {
//       colors: {
//         gray: {
//           50: "#fff9f5",
//           51: "#fff9f6",
//           52: "#f9fdff",
//           300: "#dbdbdb",
//           400: "#c4c4c4",
//           401: "#c0c0c0",
//           600: "#6e6e6e",
//           604: "#787878",
//           700: "#626262",
//           900: "#191919",
//           "900_cc": "#191919cc",
//         },
//         deep_orange: {
//           50: "#fbeee6",
//           300: "#ff9e65",
//           400: "#ff8b46",
//           900: "#883301",
//         },
//         red: { 100: "#ffe0ce", 101: "#ecd6c8" },
//         bluegray: {
//           100: "#d6d6d6",
//           101: "#d9d9d9",
//           102: "#cfcfcf",
//           600: "#406f85",
//           "300_33": "#91aebb33",
//         },
//         orange: { A700: "#fd650b" },
//         yellow: { 50: "#fff7f0" },
//         white: { A700: "#ffffff" },
//       },
//       fontFamily: { manrope: "Manrope", markoone: "Marko One" },
//       boxShadow: { bs: "0px 30px  30px 0px #91aebb33" },
//     },
//   },
//   plugins: [require("@tailwindcss/forms")],
// };
