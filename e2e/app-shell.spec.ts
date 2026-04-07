import { test, expect } from '@playwright/test';

test.describe('AppShell Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=layout-appshell--default&viewMode=story');
  });

  test('should render sidebar', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
  });

  test('should render header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Dashboard Overview');
  });

  test('should render main content area', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
    await expect(main).toContainText('Welcome back');
  });

  test('should render sidebar navigation items', async ({ page }) => {
    const dashboardItem = page.getByText('Dashboard');
    await expect(dashboardItem).toBeVisible();
    const inventoryItem = page.getByText('Inventory');
    await expect(inventoryItem).toBeVisible();
  });

  test('should render sidebar logo', async ({ page }) => {
    const logo = page.getByText('STOKED');
    await expect(logo).toBeVisible();
  });

  test('should render header action button', async ({ page }) => {
    const exportButton = page.getByRole('button', { name: 'Export' });
    await expect(exportButton).toBeVisible();
  });

  test('should have sidebar toggle button', async ({ page }) => {
    const toggleButton = page.getByLabel(/collapse sidebar|expand sidebar/i);
    await expect(toggleButton).toBeVisible();
  });

  test('should toggle sidebar collapse state', async ({ page }) => {
    const sidebar = page.locator('aside');
    await expect(sidebar).not.toHaveAttribute('data-collapsed');
    const toggleButton = page.getByLabel(/collapse sidebar/i);
    await toggleButton.click();
    await expect(sidebar).toHaveAttribute('data-collapsed', 'true');
  });
});
