import { test, expect } from '@playwright/test';

test.describe('Tooltip Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-tooltip--default&viewMode=story');
  });

  test('should render trigger element', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Hover me' });
    await expect(trigger).toBeVisible();
  });

  test('should show tooltip on hover', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Hover me' });
    await trigger.hover();

    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible({ timeout: 1000 });
  });

  test('should hide tooltip on mouse leave', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Hover me' });
    await trigger.hover();

    await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 1000 });

    await page.mouse.move(0, 0);
    await expect(page.getByRole('tooltip')).not.toBeVisible({ timeout: 1000 });
  });

  test('should show tooltip on focus', async ({ page }) => {
    await page.keyboard.press('Tab');

    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible({ timeout: 1000 });
  });

  test('should hide tooltip on Escape key', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 1000 });

    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).not.toBeVisible({ timeout: 1000 });
  });

  test('placements should position correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-tooltip--placements&viewMode=story');

    const topButton = page.getByRole('button', { name: 'Top' });
    await topButton.hover();

    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toHaveAttribute('data-placement', 'top');
  });
});
