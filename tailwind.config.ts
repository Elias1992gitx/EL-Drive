import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        aurora: 'aurora 60s linear infinite',
        'aurora-movement': 'aurora-movement 60s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        'aurora-movement': {
          '0%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '50%': { transform: 'translate(1%, 1%) rotate(180deg)' },
          '100%': { transform: 'translate(0%, 0%) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }: any) {
  const colors = flattenColorPalette(theme("colors"));
  const variables = Object.fromEntries(
    Object.entries(colors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": variables,
  });
}

export default config;
