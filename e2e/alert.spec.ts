import { test, expect } from '@playwright/test';

test.describe('Alert', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--default');
  });

  test('should render alert', async ({ page }) => {
    const alert = page.locator('[role="alert"]');
    await expect(alert).toBeVisible();
  });

  test('should have correct aria-live attribute', async ({ page }) => {
    const alert = page.locator('[role="alert"]');
    await expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  test('should display title', async ({ page }) => {
    const title = page.getByText('Information');
    await expect(title).toBeVisible();
  });

  test('should display description', async ({ page }) => {
    const description = page.getByText('This is an informational alert message.');
    await expect(description).toBeVisible();
  });
});

test.describe('Alert Statuses', () => {
  test('should render info alert', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--info');
    const alert = page.locator('[data-status="info"]');
    await expect(alert).toBeVisible();
  });

  test('should render success alert', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--success');
    const alert = page.locator('[data-status="success"]');
    await expect(alert).toBeVisible();
  });

  test('should render warning alert', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--warning');
    const alert = page.locator('[data-status="warning"]');
    await expect(alert).toBeVisible();
  });

  test('should render error alert', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--error');
    const alert = page.locator('[data-status="error"]');
    await expect(alert).toBeVisible();
  });
});

test.describe('Closable Alert', () => {
  test('should render close button when closable', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--closable');
    const closeButton = page.getByRole('button', { name: 'Close alert' });
    await expect(closeButton).toBeVisible();
  });

  test('should close alert when close button is clicked', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--closable');
    const alert = page.locator('[role="alert"]');
    const closeButton = page.getByRole('button', { name: 'Close alert' });

    await expect(alert).toBeVisible();
    await closeButton.click();
    await expect(alert).not.toBeVisible();
  });

  test('close button should be keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--closable');
    const closeButton = page.getByRole('button', { name: 'Close alert' });

    await closeButton.focus();
    await expect(closeButton).toBeFocused();
    await page.keyboard.press('Enter');

    const alert = page.locator('[role="alert"]');
    await expect(alert).not.toBeVisible();
  });
});

test.describe('Alert Variants', () => {
  test('should render solid variant', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--solid-variant');
    const alerts = page.locator('[data-variant="solid"]');
    await expect(alerts.first()).toBeVisible();
  });

  test('should render outline variant', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--outline-variant');
    const alerts = page.locator('[data-variant="outline"]');
    await expect(alerts.first()).toBeVisible();
  });
});
