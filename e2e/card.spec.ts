import { test, expect } from '@playwright/test';

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--default&viewMode=story');
  });

  test('should render card as article element', async ({ page }) => {
    const card = page.getByRole('article');
    await expect(card).toBeVisible();
  });

  test('should render card header', async ({ page }) => {
    await expect(page.getByText('Card Title')).toBeVisible();
  });

  test('should render card body content', async ({ page }) => {
    await expect(page.getByText('This is the card body content')).toBeVisible();
  });

  test('should render card footer with action button', async ({ page }) => {
    const actionButton = page.getByRole('button', { name: 'Action' });
    await expect(actionButton).toBeVisible();
  });

  test('should have elevated variant by default', async ({ page }) => {
    const card = page.getByRole('article');
    await expect(card).toHaveAttribute('data-variant', 'elevated');
  });

  test('should render outlined variant', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--outlined&viewMode=story');
    const card = page.getByRole('article');
    await expect(card).toHaveAttribute('data-variant', 'outlined');
  });

  test('should render filled variant', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--filled&viewMode=story');
    const card = page.getByRole('article');
    await expect(card).toHaveAttribute('data-variant', 'filled');
  });

  test('clickable card should be focusable', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--clickable&viewMode=story');
    const card = page.getByRole('article');
    await expect(card).toHaveAttribute('data-clickable', '');
    await card.focus();
    await expect(card).toBeFocused();
  });

  test('hoverable card should have data-hoverable attribute', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--hoverable&viewMode=story');
    const card = page.getByRole('article');
    await expect(card).toHaveAttribute('data-hoverable', '');
  });

  test('should render card with image', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--with-image&viewMode=story');
    const image = page.getByRole('img', { name: 'Mountain landscape' });
    await expect(image).toBeVisible();
  });
});
