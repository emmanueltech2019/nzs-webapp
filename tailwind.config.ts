import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
      },
      backgroundImage: {
        bgImage: "var(--background-Image)",
        bgiPhone15: "var(--background-iPhone-15)",
        bgWorldMap: "var(--background-world-map)",
      },
    },
  },
  plugins: [],
};
export default config;
