import { test, expect } from '@playwright/test';

test.describe('Accordion Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-accordion--default&viewMode=story');
  });

  test('should render accordion with items', async ({ page }) => {
    const buttons = page.locator('[role="button"]');
    await expect(buttons).toHaveCount(3);
  });

  test('should expand item on click', async ({ page }) => {
    const firstButton = page.locator('[role="button"]').first();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator('[role="region"]').first();
    await expect(panel).toBeVisible();
  });

  test('should collapse item on second click', async ({ page }) => {
    const firstButton = page.locator('[role="button"]').first();
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should only allow one item open at a time by default', async ({ page }) => {
    const buttons = page.locator('[role="button"]');
    await buttons.nth(0).click();
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await buttons.nth(1).click();
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
  });

  test('should expand item with keyboard Enter', async ({ page }) => {
    const firstButton = page.locator('[role="button"]').first();
    await firstButton.focus();
    await page.keyboard.press('Enter');
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should expand item with keyboard Space', async ({ page }) => {
    const firstButton = page.locator('[role="button"]').first();
    await firstButton.focus();
    await page.keyboard.press('Space');
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have correct aria-controls linking', async ({ page }) => {
    const firstButton = page.locator('[role="button"]').first();
    await firstButton.click();
    const panelId = await firstButton.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = page.locator(`#${panelId}`);
    await expect(panel).toBeVisible();
    await expect(panel).toHaveAttribute('role', 'region');
  });

  test('should render with default open item', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-accordion--default-open&viewMode=story');
    const firstButton = page.locator('[role="button"]').first();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should allow multiple items open when allowMultiple is set', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-accordion--allow-multiple&viewMode=story');
    const buttons = page.locator('[role="button"]');
    await buttons.nth(0).click();
    await buttons.nth(1).click();
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
  });

  test('disabled item should not be expandable', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-accordion--with-disabled-item&viewMode=story');
    const disabledButton = page.locator('[role="button"][aria-disabled="true"]');
    await expect(disabledButton).toBeVisible();
    await disabledButton.click();
    await expect(disabledButton).toHaveAttribute('aria-expanded', 'false');
  });
});
