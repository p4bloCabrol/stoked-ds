import { test, expect } from '@playwright/test';

test.describe('SearchInput Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=form-controls-searchinput--default&viewMode=story');
  });

  test('should render search input', async ({ page }) => {
    const input = page.getByRole('searchbox');
    await expect(input).toBeVisible();
  });

  test('should show placeholder text', async ({ page }) => {
    const input = page.getByRole('searchbox');
    await expect(input).toHaveAttribute('placeholder', 'Search inventory...');
  });

  test('should accept text input', async ({ page }) => {
    const input = page.getByRole('searchbox');
    await input.fill('test query');
    await expect(input).toHaveValue('test query');
  });

  test('should be focusable', async ({ page }) => {
    const input = page.getByRole('searchbox');
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('should render with label', async ({ page }) => {
    await page.goto('/iframe.html?id=form-controls-searchinput--with-label&viewMode=story');
    const label = page.getByText('Search');
    await expect(label).toBeVisible();
  });

  test('should render search icon', async ({ page }) => {
    const icon = page.locator('svg[aria-hidden="true"]');
    await expect(icon.first()).toBeVisible();
  });

  test('should clear text and type new text', async ({ page }) => {
    const input = page.getByRole('searchbox');
    await input.fill('first query');
    await expect(input).toHaveValue('first query');
    await input.fill('second query');
    await expect(input).toHaveValue('second query');
  });

  test('should render in different sizes', async ({ page }) => {
    await page.goto('/iframe.html?id=form-controls-searchinput--sizes&viewMode=story');
    const inputs = page.getByRole('searchbox');
    await expect(inputs).toHaveCount(3);
  });
});
