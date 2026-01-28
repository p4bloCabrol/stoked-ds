import { test, expect } from '@playwright/test';

test.describe('Switch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-switch--default&viewMode=story');
  });

  test('should render switch with label', async ({ page }) => {
    const switchEl = page.getByRole('switch');
    await expect(switchEl).toBeVisible();
  });

  test('should have correct initial state', async ({ page }) => {
    const switchEl = page.getByRole('switch');
    await expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });

  test('should toggle on click', async ({ page }) => {
    const switchEl = page.getByRole('switch');
    await switchEl.click();
    await expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  test('should toggle off when clicked again', async ({ page }) => {
    const switchEl = page.getByRole('switch');
    await switchEl.click();
    await switchEl.click();
    await expect(switchEl).toHaveAttribute('aria-checked', 'false');
  });

  test('should be focusable via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const switchEl = page.getByRole('switch');
    await expect(switchEl).toBeFocused();
  });

  test('should toggle with Space key', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    const switchEl = page.getByRole('switch');
    await expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  test('disabled switch should not toggle', async ({ page }) => {
    await page.goto('/iframe.html?id=components-switch--disabled&viewMode=story');
    const switchEl = page.getByRole('switch');
    await expect(switchEl).toBeDisabled();
  });
});
