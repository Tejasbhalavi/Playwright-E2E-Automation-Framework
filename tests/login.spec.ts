import { test, expect } from "@playwright/test";

test("Verify SauceDemo login page opens", async ({ page }) => {
  // Open application
  await page.goto("https://www.saucedemo.com/");

  // Verify page title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Verify username field
  await expect(page.locator('[data-test="username"]')).toBeVisible();

  // Verify password field
  await expect(page.locator('[data-test="password"]')).toBeVisible();

  // Verify login button
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
