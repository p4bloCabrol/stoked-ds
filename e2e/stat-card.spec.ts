import { test, expect } from '@playwright/test';

test.describe('StatCard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-statcard--default&viewMode=story');
  });

  test('should render stat card', async ({ page }) => {
    const label = page.getByText('Total Items');
    await expect(label).toBeVisible();
  });

  test('should display value', async ({ page }) => {
    await expect(page.getByText('12,450')).toBeVisible();
  });

  test('should display icon', async ({ page }) => {
    await expect(page.getByText('📦')).toBeVisible();
  });

  test('should display trend with direction', async ({ page }) => {
    const trend = page.getByText('↑ +2.4%');
    await expect(trend).toBeVisible();
  });

  test('should render warning status', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-statcard--warning&viewMode=story');
    await expect(page.getByText('Low Stock Alerts')).toBeVisible();
    await expect(page.getByText('14')).toBeVisible();
    const icon = page.getByText('⚠️');
    await expect(icon).toBeVisible();
  });

  test('should render danger status', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-statcard--danger&viewMode=story');
    await expect(page.getByText('Out of Stock')).toBeVisible();
    await expect(page.getByText('5')).toBeVisible();
  });

  test('should render grid layout with multiple cards', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-statcard--grid&viewMode=story');
    await expect(page.getByText('Total Items')).toBeVisible();
    await expect(page.getByText('Low Stock')).toBeVisible();
    await expect(page.getByText('Out of Stock')).toBeVisible();
    await expect(page.getByText('Monthly Growth')).toBeVisible();
  });

  test('should display trend direction attribute', async ({ page }) => {
    const trend = page.locator('[data-direction="up"]');
    await expect(trend).toBeVisible();
  });
});
