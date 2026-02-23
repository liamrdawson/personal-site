import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Liam Dawson/);
});

// has menu

// menu has options

// list of posts renders
