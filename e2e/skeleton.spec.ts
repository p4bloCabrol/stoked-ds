import { test, expect } from '@playwright/test';

test.describe('Skeleton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--default');
  });

  test('should render skeleton', async ({ page }) => {
    const skeleton = page.locator('[data-testid="skeleton"]').first();
    await expect(skeleton).toBeVisible();
  });

  test('should have busy state for accessibility', async ({ page }) => {
    const skeleton = page.locator('[aria-busy="true"]').first();
    await expect(skeleton).toBeVisible();
  });
});

test.describe('Skeleton Variants', () => {
  test('should render text variant', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--text-lines');
    const skeletons = page.locator('[data-variant="text"]');
    await expect(skeletons.first()).toBeVisible();
  });

  test('should render circular variant', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--circular');
    const skeleton = page.locator('[data-variant="circular"]');
    await expect(skeleton).toBeVisible();
  });

  test('should render rectangular variant', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--rectangular');
    const skeleton = page.locator('[data-variant="rectangular"]');
    await expect(skeleton).toBeVisible();
  });
});

test.describe('Skeleton Animation', () => {
  test('should have pulse animation by default', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--default');
    const skeleton = page.locator('[data-animation="pulse"]').first();
    await expect(skeleton).toBeVisible();
  });

  test('should render wave animation', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--wave-animation');
    const skeleton = page.locator('[data-animation="wave"]').first();
    await expect(skeleton).toBeVisible();
  });
});

test.describe('Skeleton Card Example', () => {
  test('should render card skeleton layout', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-skeleton--card-skeleton');
    const skeletons = page.locator('[aria-busy="true"]');
    await expect(skeletons.first()).toBeVisible();
  });
});
