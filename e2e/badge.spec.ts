import { test, expect } from '@playwright/test';

test.describe('Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-badge--default&viewMode=story');
  });

  test('should render badge', async ({ page }) => {
    const badge = page.getByText('Badge');
    await expect(badge).toBeVisible();
  });

  test('should have correct default attributes', async ({ page }) => {
    const badge = page.locator('[data-variant="solid"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('data-color', 'primary');
    await expect(badge).toHaveAttribute('data-size', 'md');
  });

  test('variants should render correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-badge--variants&viewMode=story');

    const solid = page.locator('[data-variant="solid"]');
    const subtle = page.locator('[data-variant="subtle"]');
    const outline = page.locator('[data-variant="outline"]');

    await expect(solid).toBeVisible();
    await expect(subtle).toBeVisible();
    await expect(outline).toBeVisible();
  });

  test('colors should render correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-badge--colors&viewMode=story');

    const primary = page.locator('[data-color="primary"]');
    const success = page.locator('[data-color="success"]');
    const warning = page.locator('[data-color="warning"]');
    const danger = page.locator('[data-color="danger"]');

    await expect(primary).toBeVisible();
    await expect(success).toBeVisible();
    await expect(warning).toBeVisible();
    await expect(danger).toBeVisible();
  });
});
