import { test, expect } from '@playwright/test';

test.describe('Table Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--default&viewMode=story');
  });

  test('should render table', async ({ page }) => {
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
  });

  test('should render column headers', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Role' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
  });

  test('should render data rows', async ({ page }) => {
    const rows = page.getByRole('row');
    // 1 header row + 4 data rows
    await expect(rows).toHaveCount(5);
  });

  test('should display cell data', async ({ page }) => {
    await expect(page.getByRole('cell', { name: 'John Doe' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'john@example.com' })).toBeVisible();
  });

  test('should render striped variant', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--striped&viewMode=story');
    const table = page.getByRole('table');
    await expect(table).toHaveAttribute('data-variant', 'striped');
  });

  test('should render sortable columns', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--sortable&viewMode=story');
    const sortButton = page.locator('[aria-sort]').first();
    await expect(sortButton).toBeVisible();
  });

  test('should toggle sort direction on click', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--sortable&viewMode=story');
    const nameSort = page.locator('[aria-sort="ascending"]').first();
    await nameSort.click();
    await expect(page.locator('[aria-sort="descending"]').first()).toBeVisible();
  });

  test('should render table with caption', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--with-caption&viewMode=story');
    const caption = page.getByText('User Directory - Q4 2024');
    await expect(caption).toBeVisible();
  });

  test('should render numeric data aligned correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--with-numeric-data&viewMode=story');
    const numericCells = page.locator('[data-numeric="true"]');
    const count = await numericCells.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render selectable rows with checkboxes', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--selectable-rows&viewMode=story');
    const checkboxes = page.getByRole('checkbox');
    const count = await checkboxes.count();
    // 1 header checkbox + 4 row checkboxes
    expect(count).toBe(5);
  });
});
