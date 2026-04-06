/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ctp: {
          rosewater: '#dc8a78',
          flamingo: '#dd7878',
          pink: '#ea76cb',
          mauve: '#8839ef',
          red: '#d20f39',
          maroon: '#e64553',
          peach: '#fe640b',
          yellow: '#df8e1d',
          green: '#40a02b',
          teal: '#179299',
          sky: '#04a5e5',
          sapphire: '#209fb5',
          blue: '#1e66f5',
          lavender: '#7287fd',
          text: '#5c4a52',
          subtext1: '#6e5a63',
          subtext0: '#806b74',
          overlay2: '#937e87',
          overlay1: '#a5919a',
          overlay0: '#b5a3ab',
          surface2: '#c9b8bf',
          surface1: '#d6c8ce',
          surface0: '#e2d6db',
          base: '#f8f2f4',
          mantle: '#f1e8ec',
          crust: '#e9dde2',
        },
      },
      fontFamily: {
        sans: ['"Fira Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
