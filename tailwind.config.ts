import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        desktop: "var(--color-desktop)",
        surface: "var(--color-surface)",
        surfaceMuted: "var(--color-surface-muted)",
        ink: "var(--color-ink)",
        titlebar: "var(--color-titlebar)",
        titlebarText: "var(--color-titlebar-text)",
        accent: "var(--color-accent)",
        accentHover: "var(--color-accent-hover)",
        retroBorder: "var(--color-border)",
        retroShadow: "var(--color-shadow)",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        retro: "4px 4px 0px var(--color-shadow)",
        "retro-sm": "2px 2px 0px var(--color-shadow)",
        "retro-lg": "6px 6px 0px var(--color-shadow)",
        "retro-inset": "inset 2px 2px 0px var(--color-shadow)",
      },
    },
  },
  plugins: [],
};
export default config;
