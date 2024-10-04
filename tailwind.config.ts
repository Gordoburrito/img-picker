import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          100: '#dbeafe',
          500: '#3b82f6',
        },
        green: {
          100: '#dcfce7',
          500: '#22c55e',
        },
      },
    },
  },
  plugins: [],
};

export default config;
