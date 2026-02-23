import { expect, test } from "@playwright/test";

test.describe("blog post page", () => {
    test("images should have alt-text", async ({ page }) => {
        await page.goto("/blog/scalable-remix-deployment-on-aws", {
            waitUntil: "networkidle",
        });

        // check that all of the images have alt text
        const images = await page.locator("img").elementHandles();
        for (const image of images) {
            const altText = await image.getAttribute("alt");
            expect(altText).toBeTruthy();
        }
    });
});
