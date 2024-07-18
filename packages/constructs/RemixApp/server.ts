import { createRequestHandler } from "@remix-run/architect";
import { ServerBuild } from "@remix-run/node";
// import * as build from "@remix-run/dev/server-build";

// if (process.env.NODE_ENV !== "production") {
//   require("./mocks");
// }

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

// const remixHandler = createRequestHandler({
//   build: viteDevServer
//     ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
//     : await import("./build/server/index.js"),
// });

export const handler = createRequestHandler({
  // @ts-expect-error server index.js doesn't always exist
  build: viteDevServer
    ? () =>
        viteDevServer.ssrLoadModule(
          "virtual:remix/server-build"
        ) as unknown as ServerBuild
    : await import("./build/server/index.js"),
  mode: process.env.NODE_ENV,
});
