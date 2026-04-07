import { test, expect } from '@playwright/test';

test.describe('Sidebar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=layout-sidebar--default&viewMode=story');
  });

  test('should render sidebar', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
  });

  test('should render logo', async ({ page }) => {
    await expect(page.getByText('STOKED')).toBeVisible();
  });

  test('should render navigation items', async ({ page }) => {
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Inventory')).toBeVisible();
    await expect(page.getByText('Reports')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });

  test('should show active item', async ({ page }) => {
    const activeItem = page.locator('[data-active]');
    await expect(activeItem).toBeVisible();
    await expect(activeItem).toContainText('Dashboard');
  });

  test('should render in collapsed state', async ({ page }) => {
    await page.goto('/iframe.html?id=layout-sidebar--collapsed&viewMode=story');
    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });

  test('should toggle collapse state', async ({ page }) => {
    await page.goto('/iframe.html?id=layout-sidebar--collapsible-interactive&viewMode=story');
    const sidebar = page.locator('aside');
    await expect(sidebar).not.toHaveAttribute('data-collapsed');
    const toggleButton = page.getByLabel('Collapse sidebar');
    await toggleButton.click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });

  test('should update toggle button label when collapsed', async ({ page }) => {
    await page.goto('/iframe.html?id=layout-sidebar--collapsible-interactive&viewMode=story');
    const collapseButton = page.getByLabel('Collapse sidebar');
    await collapseButton.click();
    const expandButton = page.getByLabel('Expand sidebar');
    await expect(expandButton).toBeVisible();
  });

  test('should render section titles', async ({ page }) => {
    await page.goto('/iframe.html?id=layout-sidebar--collapsible-interactive&viewMode=story');
    await expect(page.getByText('Main')).toBeVisible();
    await expect(page.getByText('System')).toBeVisible();
  });

  test('sidebar items should be clickable buttons', async ({ page }) => {
    const items = page.locator('aside button').filter({ hasNotText: /collapse|expand/i });
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
