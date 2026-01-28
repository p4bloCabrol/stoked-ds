import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--with-label&viewMode=story');
  });

  test('should render input with label', async ({ page }) => {
    const input = page.getByLabel('Email');
    await expect(input).toBeVisible();
  });

  test('should accept text input', async ({ page }) => {
    const input = page.getByLabel('Email');
    await input.fill('test@example.com');
    await expect(input).toHaveValue('test@example.com');
  });

  test('should be focusable', async ({ page }) => {
    const input = page.getByLabel('Email');
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('error state should show error message', async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--with-error&viewMode=story');
    const errorMessage = page.getByRole('alert');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('valid email');
  });

  test('disabled input should not be editable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--disabled&viewMode=story');
    const input = page.getByLabel('Disabled Input');
    await expect(input).toBeDisabled();
  });

  test('required field should show asterisk', async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--required&viewMode=story');
    const asterisk = page.getByText('*');
    await expect(asterisk).toBeVisible();
  });
});
