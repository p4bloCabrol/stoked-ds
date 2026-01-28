import { test, expect } from '@playwright/test';

test.describe('Avatar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-avatar--default&viewMode=story');
  });

  test('should render avatar with image', async ({ page }) => {
    const avatar = page.getByRole('img');
    await expect(avatar).toBeVisible();
  });

  test('should have correct size attribute', async ({ page }) => {
    const avatar = page.locator('[data-size="md"]');
    await expect(avatar).toBeVisible();
  });

  test('fallback should show initials when no image', async ({ page }) => {
    await page.goto('/iframe.html?id=components-avatar--with-fallback&viewMode=story');
    const initials = page.getByText('JD');
    await expect(initials).toBeVisible();
  });

  test('status indicator should be visible', async ({ page }) => {
    await page.goto('/iframe.html?id=components-avatar--with-status&viewMode=story');
    const onlineStatus = page.locator('[data-status="online"]');
    await expect(onlineStatus.first()).toBeVisible();
  });

  test('different sizes should render correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-avatar--sizes&viewMode=story');

    const xs = page.locator('[data-size="xs"]');
    const lg = page.locator('[data-size="lg"]');

    await expect(xs).toBeVisible();
    await expect(lg).toBeVisible();
  });
});
