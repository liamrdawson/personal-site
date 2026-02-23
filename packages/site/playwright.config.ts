import { defineConfig } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
    webServer: {
        command: "pnpm build && pnpm dev",
        port: 3000,
        timeout: 60000,
        reuseExistingServer: !process.env.CI,
    },
    testDir: "tests",
});
