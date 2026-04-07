import { test, expect } from '@playwright/test';

test.describe('Breadcrumb Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-breadcrumb--default&viewMode=story');
  });

  test('should render breadcrumb navigation', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(nav).toBeVisible();
  });

  test('should render all breadcrumb items', async ({ page }) => {
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Inventory')).toBeVisible();
    await expect(page.getByText('Add New Item')).toBeVisible();
  });

  test('should render links for non-last items with href', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
  });

  test('should mark last item as current page', async ({ page }) => {
    const currentItem = page.getByText('Add New Item');
    await expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  test('should render separators between items', async ({ page }) => {
    const separators = page.locator('[aria-hidden="true"]');
    await expect(separators).toHaveCount(2);
    await expect(separators.first()).toHaveText('/');
  });

  test('should render two levels', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-breadcrumb--two-levels&viewMode=story');
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Dashboard')).toBeVisible();
    const separators = page.locator('[aria-hidden="true"]');
    await expect(separators).toHaveCount(1);
  });

  test('should support custom separator', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-breadcrumb--custom-separator&viewMode=story');
    const separators = page.locator('[aria-hidden="true"]');
    await expect(separators.first()).toHaveText('\u203A');
  });

  test('last item should not be a link', async ({ page }) => {
    const lastItem = page.getByText('Add New Item');
    const tagName = await lastItem.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('span');
  });
});
