// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  vite: {
      ssr:{
          noExternal: ['gsap']
      },
      build:{
          target: 'esnext'
      },
      optimizeDeps: {
          include: ['gsap'],
      },
      plugins: [tailwindcss()],
  },

  integrations: [icon()],
});