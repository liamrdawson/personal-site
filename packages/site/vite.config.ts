import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  plugins: [
    reactRouter(),
    tsconfigPaths({ projects: ["./tsconfig.vite.json"] }),
    netlifyPlugin(),
  ],
}));
