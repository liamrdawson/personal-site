/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import devtoolsJson from 'vite-plugin-devtools-json';

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
