/// <reference types="vitest" />
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [devtoolsJson()],
    test: {
        include: ["**/__tests__/**"],
    },
});
