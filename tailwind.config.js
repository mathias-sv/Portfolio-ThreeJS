/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'purpleosc': {
          '50': '#f5f5fa',
          '100': '#e9eaf5',
          '200': '#cfd2e8',
          '300': '#a4abd5',
          '400': '#7480bc',
          '500': '#525fa5',
          '600': '#3f488a',
          '700': '#343b70',
          '800': '#2e345e',
          '900': '#2a2e50',
          '950': '#10111e',
        },
        'coralred': {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecaca',
          '300': '#fca5a5',
          '400': '#f87171',
          '500': '#ef4444',
          '600': '#dc2626',
          '700': '#b91c1c',
          '800': '#991b1b',
          '900': '#7f1d1d',
          '950': '#450a0a',
      },
      'sweetpink': {
        '50': '#fdf3f3',
        '100': '#fce5e4',
        '200': '#fbcecd',
        '300': '#f59794',
        '400': '#f07d79',
        '500': '#e5534e',
        '600': '#d23530',
        '700': '#b02925',
        '800': '#922522',
        '900': '#792623',
        '950': '#420f0d',
    },
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, #161727, #1c1e39, #23264b, #2a2d5e, #313572)'
      },
      fontFamily: {
        ones: ['Onest Variable', 'sans-serif'],
      },
    },
  },
  plugins: [nextui()],
}
