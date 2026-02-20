/// <reference types="vitest" />
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from "vitest/config";

export default defineConfig({
   plugins: [
    devtoolsJson(),
    // ...
  ],
  test: {
    // ... Specify options here.
    include: ["**/__tests__/**"],
  },
});
