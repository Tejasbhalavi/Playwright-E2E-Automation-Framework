import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

// TC_LOGIN_01 - Valid login
test("Login with valid credentials", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");

  await page.locator('[data-test="password"]').fill("secret_sauce");

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);

  await expect(page.locator(".title")).toHaveText("Products");
});

// TC_LOGIN_02 - Invalid username
test("Login with invalid username", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("invalid_user");

  await page.locator('[data-test="password"]').fill("secret_sauce");

  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username and password do not match",
  );
});

// TC_LOGIN_03 - Invalid password
test("Login with invalid password", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");

  await page.locator('[data-test="password"]').fill("wrong_password");

  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username and password do not match",
  );
});

// TC_LOGIN_04 - Empty username and password
test("Login with empty credentials", async ({ page }) => {
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username is required",
  );
});

// TC_LOGIN_05 - Locked user
test("Login with locked user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("locked_out_user");

  await page.locator('[data-test="password"]').fill("secret_sauce");

  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

  await expect(page.locator('[data-test="error"]')).toContainText("locked out");
});
