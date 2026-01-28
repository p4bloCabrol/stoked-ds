import { test, expect } from '@playwright/test';

test.describe('Toast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');
  });

  test('should show toast when triggered', async ({ page }) => {
    const infoButton = page.getByRole('button', { name: 'Info Toast' });
    await infoButton.click();

    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible();
  });

  test('should have correct aria attributes', async ({ page }) => {
    const infoButton = page.getByRole('button', { name: 'Info Toast' });
    await infoButton.click();

    const toast = page.getByRole('alert');
    await expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  test('should display title and description', async ({ page }) => {
    const infoButton = page.getByRole('button', { name: 'Info Toast' });
    await infoButton.click();

    await expect(page.getByText('Info')).toBeVisible();
    await expect(page.getByText('This is an informational message.')).toBeVisible();
  });
});

test.describe('Toast Statuses', () => {
  test('should show info toast', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');
    const button = page.getByRole('button', { name: 'Info Toast' });
    await button.click();

    const toast = page.locator('[data-status="info"]');
    await expect(toast).toBeVisible();
  });

  test('should show success toast', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');
    const button = page.getByRole('button', { name: 'Success Toast' });
    await button.click();

    const toast = page.locator('[data-status="success"]');
    await expect(toast).toBeVisible();
  });

  test('should show warning toast', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');
    const button = page.getByRole('button', { name: 'Warning Toast' });
    await button.click();

    const toast = page.locator('[data-status="warning"]');
    await expect(toast).toBeVisible();
  });

  test('should show error toast', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');
    const button = page.getByRole('button', { name: 'Error Toast' });
    await button.click();

    const toast = page.locator('[data-status="error"]');
    await expect(toast).toBeVisible();
  });
});

test.describe('Toast Close', () => {
  test('should close toast when close button is clicked', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');
    const infoButton = page.getByRole('button', { name: 'Info Toast' });
    await infoButton.click();

    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible();

    const closeButton = page.getByRole('button', { name: 'Close notification' });
    await closeButton.click();

    await expect(toast).not.toBeVisible();
  });
});

test.describe('Toast Title Only', () => {
  test('should render toast with title only', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--title-only');
    const button = page.getByRole('button', { name: 'Show Toast' });
    await button.click();

    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible();
    await expect(page.getByText('Item saved successfully!')).toBeVisible();
  });
});

test.describe('Toast Description Only', () => {
  test('should render toast with description only', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--description-only');
    const button = page.getByRole('button', { name: 'Show Toast' });
    await button.click();

    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible();
    await expect(page.getByText('Your preferences have been updated.')).toBeVisible();
  });
});

test.describe('Multiple Toasts', () => {
  test('should show multiple toasts', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--multiple-toasts');
    const showButton = page.getByRole('button', { name: 'Show Multiple Toasts' });
    await showButton.click();

    // Wait for toasts to appear
    await page.waitForTimeout(500);

    const toasts = page.getByRole('alert');
    const count = await toasts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should clear all toasts', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--multiple-toasts');
    const showButton = page.getByRole('button', { name: 'Show Multiple Toasts' });
    await showButton.click();

    // Wait for toasts to appear
    await page.waitForTimeout(500);

    const clearButton = page.getByRole('button', { name: 'Clear All' });
    await clearButton.click();

    // Wait for toasts to be removed
    await page.waitForTimeout(300);

    const toasts = page.getByRole('alert');
    await expect(toasts).toHaveCount(0);
  });
});

test.describe('Non-closable Toast', () => {
  test('should not show close button when not closable', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--non-closable');
    const button = page.getByRole('button', { name: 'Show Non-closable Toast' });
    await button.click();

    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible();

    const closeButton = page.getByRole('button', { name: 'Close notification' });
    await expect(closeButton).not.toBeVisible();
  });
});
