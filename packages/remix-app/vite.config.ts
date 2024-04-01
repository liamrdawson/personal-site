import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import type { VitePluginConfig } from "@remix-run/dev";

installGlobals();

const config: VitePluginConfig =
  process.env.NODE_ENV === "production"
    ? {
        ignoredRouteFiles: ["**/_.css"],
        serverBuildFile: "server.ts",
      }
    : {};

export default defineConfig({
  plugins: [remix(config), tsconfigPaths()],
});
