/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ... Specify options here.
    include: ["**/__tests__/**"],
  },
});
