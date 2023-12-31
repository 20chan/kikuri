import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        'half-dark-red': '#e06c75',
        'half-dark-green': '#98c379',
        'half-dark-yellow': '#e5c07b',
        'half-dark-blue': '#61afef',
        'half-dark-purple': '#c678dd',
        'half-dark-cyan': '#56b6c2',
        'half-dark-white': '#dcdfe4',
        'half-dark-black': '#282c34',
      }
    },
  },
  plugins: [],
}
export default config
