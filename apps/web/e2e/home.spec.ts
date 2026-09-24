import { expect, test } from "@playwright/test";

test("identifies the project", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "GŁĘBIA", exact: true }),
  ).toBeVisible();
});
