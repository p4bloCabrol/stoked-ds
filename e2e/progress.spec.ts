import { test, expect } from '@playwright/test';

test.describe('Progress', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-progress--default');
  });

  test('should render progressbar', async ({ page }) => {
    const progress = page.locator('[role="progressbar"]');
    await expect(progress).toBeVisible();
  });

  test('should have correct aria attributes', async ({ page }) => {
    const progress = page.locator('[role="progressbar"]');
    await expect(progress).toHaveAttribute('aria-valuenow', '60');
    await expect(progress).toHaveAttribute('aria-valuemin', '0');
    await expect(progress).toHaveAttribute('aria-valuemax', '100');
  });
});

test.describe('Progress with Label', () => {
  test('should show label when showLabel is true', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-progress--with-label');
    const label = page.getByText('60%');
    await expect(label).toBeVisible();
  });
});

test.describe('Progress Sizes', () => {
  test('should render all size variants', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-progress--sizes');
    const progressBars = page.locator('[role="progressbar"]');
    await expect(progressBars).toHaveCount(4);
  });
});

test.describe('Progress Colors', () => {
  test('should render colored progress bars', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-progress--colors');
    const progressBars = page.locator('[role="progressbar"]');
    await expect(progressBars.first()).toBeVisible();
  });
});

test.describe('Indeterminate Progress', () => {
  test('should have indeterminate state', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-progress--indeterminate');
    const progress = page.locator('[role="progressbar"]');
    await expect(progress).toHaveAttribute('data-indeterminate', 'true');
  });
});
