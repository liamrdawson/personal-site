import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("blog post page", () => {
  test("images should have alt-text", async ({ page }) => {
    await page.goto("/blog/scalable-remix-deployment-on-aws", {
      waitUntil: "networkidle",
    });

    const content = await page.content();
    console.log(content);
    // check that there are no alt-text accessiblity violations
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === "area-alt",
    );
    expect(colorContrastViolations).toEqual([]);

    // check that all of the images have alt text
    const images = await page.locator("img").elementHandles();
    for (const image of images) {
      const altText = await image.getAttribute("alt");
      expect(altText).toBeTruthy();
    }
  });
});
