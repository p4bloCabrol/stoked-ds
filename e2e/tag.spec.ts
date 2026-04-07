import { test, expect } from '@playwright/test';

test.describe('Tag Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tag--default&viewMode=story');
  });

  test('should render tag', async ({ page }) => {
    const tag = page.getByText('Tag');
    await expect(tag).toBeVisible();
  });

  test('should have neutral color by default', async ({ page }) => {
    const tag = page.locator('[data-color="neutral"]');
    await expect(tag).toBeVisible();
  });

  test('should have solid variant by default', async ({ page }) => {
    const tag = page.locator('[data-variant="solid"]');
    await expect(tag).toBeVisible();
  });

  test('should have medium size by default', async ({ page }) => {
    const tag = page.locator('[data-size="md"]');
    await expect(tag).toBeVisible();
  });

  test('should render color variants', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tag--colors&viewMode=story');
    await expect(page.locator('[data-color="primary"]')).toBeVisible();
    await expect(page.locator('[data-color="success"]')).toBeVisible();
    await expect(page.locator('[data-color="warning"]')).toBeVisible();
    await expect(page.locator('[data-color="danger"]')).toBeVisible();
    await expect(page.locator('[data-color="neutral"]')).toBeVisible();
  });

  test('should render outline variant', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tag--outline&viewMode=story');
    const outlineTag = page.locator('[data-variant="outline"]').first();
    await expect(outlineTag).toBeVisible();
  });

  test('should render different sizes', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tag--sizes&viewMode=story');
    await expect(page.locator('[data-size="sm"]')).toBeVisible();
    await expect(page.locator('[data-size="md"]')).toBeVisible();
    await expect(page.locator('[data-size="lg"]')).toBeVisible();
  });

  test('removable tag should show remove button', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tag--removable&viewMode=story');
    const removeButton = page.getByRole('button', { name: 'Remove' });
    await expect(removeButton).toBeVisible();
  });

  test('remove button should have aria-label', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tag--removable&viewMode=story');
    const removeButton = page.getByRole('button', { name: 'Remove' });
    await expect(removeButton).toHaveAttribute('aria-label', 'Remove');
  });
});
