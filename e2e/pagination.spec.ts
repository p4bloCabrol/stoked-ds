import { test, expect } from '@playwright/test';

test.describe('Pagination Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-pagination--default&viewMode=story');
  });

  test('should render pagination navigation', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Pagination' });
    await expect(nav).toBeVisible();
  });

  test('should render page buttons', async ({ page }) => {
    const page1Button = page.getByRole('button', { name: 'Page 1' });
    await expect(page1Button).toBeVisible();
  });

  test('should have first page active by default', async ({ page }) => {
    const page1Button = page.getByRole('button', { name: 'Page 1' });
    await expect(page1Button).toHaveAttribute('aria-current', 'page');
  });

  test('should navigate to next page on click', async ({ page }) => {
    const page2Button = page.getByRole('button', { name: 'Page 2' });
    await page2Button.click();
    await expect(page2Button).toHaveAttribute('aria-current', 'page');
  });

  test('should disable previous button on first page', async ({ page }) => {
    const prevButton = page.getByRole('button', { name: 'Previous page' });
    await expect(prevButton).toBeDisabled();
  });

  test('should enable previous button after navigating forward', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next page' });
    await nextButton.click();
    const prevButton = page.getByRole('button', { name: 'Previous page' });
    await expect(prevButton).toBeEnabled();
  });

  test('should navigate with next button', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next page' });
    await nextButton.click();
    const page2Button = page.getByRole('button', { name: 'Page 2' });
    await expect(page2Button).toHaveAttribute('aria-current', 'page');
  });

  test('should show ellipsis for many pages', async ({ page }) => {
    const ellipsis = page.locator('text=…');
    await expect(ellipsis.first()).toBeVisible();
  });

  test('few pages should not show ellipsis', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-pagination--few-pages&viewMode=story');
    const ellipsis = page.locator('text=…');
    await expect(ellipsis).toHaveCount(0);
  });

  test('should show last page button', async ({ page }) => {
    const lastPageButton = page.getByRole('button', { name: 'Page 10' });
    await expect(lastPageButton).toBeVisible();
  });
});
