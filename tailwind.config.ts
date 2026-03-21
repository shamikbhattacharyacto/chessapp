import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0d0d',
        card: '#1a1a1a',
        border: '#2a2a2a',
        purple: { DEFAULT: '#7c3aed', light: '#9f67ff', dim: '#3b1d8a' },
        muted: '#777777',
      },
    },
  },
  plugins: [],
};
export default config;
