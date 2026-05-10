import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
