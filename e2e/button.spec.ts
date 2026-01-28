import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
  });

  test('should render button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });
    await expect(button).toBeVisible();
  });

  test('should be clickable', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });
    await button.click();
    // Button should still be visible after click
    await expect(button).toBeVisible();
  });

  test('should show focus outline on keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    const button = page.getByRole('button', { name: 'Button' });
    await expect(button).toBeFocused();
  });

  test('should have correct data attributes', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' });
    await expect(button).toHaveAttribute('data-variant', 'solid');
    await expect(button).toHaveAttribute('data-size', 'md');
    await expect(button).toHaveAttribute('data-color', 'primary');
  });

  test('disabled button should not be clickable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled&viewMode=story');
    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('loading button should show spinner', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--loading&viewMode=story');
    const button = page.getByRole('button');
    await expect(button).toHaveAttribute('aria-busy', 'true');
  });
});
