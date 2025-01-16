import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  safelist: ["dark:bg-default"], // 防止动态生成的类被移除
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", ...defaultTheme.fontFamily.sans],
        mono: ["'Geist Mono'", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'bgdefault': '#1d1e24',
        'fontdefault': '#e6e1dc',
      },
    },
  },
  plugins: [],
};

export default config;
