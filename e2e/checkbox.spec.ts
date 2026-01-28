import { test, expect } from '@playwright/test';

test.describe('Checkbox Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-checkbox--default&viewMode=story');
  });

  test('should render checkbox with label', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
    await expect(checkbox).toBeVisible();
  });

  test('should be checkable', async ({ page }) => {
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });

  test('should uncheck when clicked again', async ({ page }) => {
    const checkbox = page.getByRole('checkbox');
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('should be focusable via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeFocused();
  });

  test('should toggle with Space key', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  });

  test('disabled checkbox should not be checkable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-checkbox--disabled&viewMode=story');
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeDisabled();
  });
});
