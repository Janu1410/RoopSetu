import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        roop: {
          cream: "#FFF8F3",
          blush: "#FFECEF",
          maroon: "#8A1238",
          wine: "#5A001F",
          text: "#2D2230",
          muted: "#64748B",
        },
      },
    },
  },
  plugins: [],
};

export default config;
