/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:              '#cc785c',
        primaryActive:        '#a9583e',
        primaryDisabled:      '#e6dfd8',
        accentTeal:           '#5db8a6',
        accentAmber:          '#e8a55a',
        canvas:               '#faf9f5',
        surfaceSoft:          '#f5f0e8',
        surfaceCard:          '#efe9de',
        surfaceCreamStrong:   '#e8e0d2',
        surfaceDark:          '#181715',
        surfaceDarkElevated:  '#252320',
        surfaceDarkSoft:      '#1f1e1b',
        hairline:             '#e6dfd8',
        hairlineSoft:         '#ebe6df',
        ink:                  '#141413',
        bodyStrong:           '#252523',
        bodyText:             '#3d3d3a',
        muted:                '#6c6a64',
        mutedSoft:            '#8e8b82',
        onDark:               '#faf9f5',
        onDarkSoft:           '#a09d96',
        success:              '#5db872',
        warning:              '#d4a017',
        error:                '#c64545',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}

