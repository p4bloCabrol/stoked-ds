import { test, expect } from '@playwright/test';

test.describe('Select Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-select--with-label&viewMode=story');
  });

  test('should render select with label', async ({ page }) => {
    const select = page.getByRole('combobox');
    await expect(select).toBeVisible();
  });

  test('should show placeholder', async ({ page }) => {
    const placeholder = page.getByText('Select a country');
    await expect(placeholder).toBeVisible();
  });

  test('should change value on selection', async ({ page }) => {
    const select = page.getByRole('combobox');
    await select.selectOption('us');
    await expect(select).toHaveValue('us');
  });

  test('should display all options', async ({ page }) => {
    const select = page.getByRole('combobox');
    const options = select.locator('option');
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should be focusable', async ({ page }) => {
    const select = page.getByRole('combobox');
    await select.focus();
    await expect(select).toBeFocused();
  });

  test('disabled select should not be interactable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-select--disabled&viewMode=story');
    const select = page.getByRole('combobox');
    await expect(select).toBeDisabled();
  });

  test('error state should show error message', async ({ page }) => {
    await page.goto('/iframe.html?id=components-select--with-error&viewMode=story');
    const errorMessage = page.getByRole('alert');
    await expect(errorMessage).toBeVisible();
  });
});
