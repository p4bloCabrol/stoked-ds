import { test, expect } from '@playwright/test';

test.describe('Spinner', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-spinner--default');
  });

  test('should render spinner', async ({ page }) => {
    const spinner = page.locator('[role="status"]');
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  test('should have correct accessibility label', async ({ page }) => {
    const spinner = page.locator('[role="status"]');
    await expect(spinner).toHaveAttribute('aria-live', 'polite');
  });
});

test.describe('Spinner Sizes', () => {
  test('should render small spinner', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-spinner--sizes');
    const spinners = page.locator('[role="status"]');
    await expect(spinners.first()).toBeVisible();
  });

  test('should render all size variants', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-spinner--sizes');
    const spinners = page.locator('[role="status"]');
    await expect(spinners).toHaveCount(4);
  });
});

test.describe('Spinner Colors', () => {
  test('should render colored spinners', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-spinner--colors');
    const spinners = page.locator('[role="status"]');
    await expect(spinners.first()).toBeVisible();
  });
});
