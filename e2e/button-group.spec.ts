import { test, expect } from '@playwright/test';

test.describe('ButtonGroup Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=form-controls-buttongroup--default&viewMode=story');
  });

  test('should render button group', async ({ page }) => {
    const group = page.getByRole('group');
    await expect(group).toBeVisible();
  });

  test('should render all option buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'High' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Low' })).toBeVisible();
  });

  test('should have default selected value', async ({ page }) => {
    const mediumButton = page.getByRole('button', { name: 'Medium' });
    await expect(mediumButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('should change selection on click', async ({ page }) => {
    const highButton = page.getByRole('button', { name: 'High' });
    const mediumButton = page.getByRole('button', { name: 'Medium' });
    await highButton.click();
    await expect(highButton).toHaveAttribute('aria-pressed', 'true');
    await expect(mediumButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('should have data-active on selected button', async ({ page }) => {
    const mediumButton = page.getByRole('button', { name: 'Medium' });
    await expect(mediumButton).toHaveAttribute('data-active', '');
  });

  test('unselected buttons should have aria-pressed false', async ({ page }) => {
    const highButton = page.getByRole('button', { name: 'High' });
    const lowButton = page.getByRole('button', { name: 'Low' });
    await expect(highButton).toHaveAttribute('aria-pressed', 'false');
    await expect(lowButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('should be focusable via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    const role = await focusedElement.getAttribute('role');
    // The focused element should be a button within the group
    expect(await focusedElement.evaluate((el) => el.tagName.toLowerCase())).toBe('button');
  });

  test('view toggle should work with two options', async ({ page }) => {
    await page.goto('/iframe.html?id=form-controls-buttongroup--view-toggle&viewMode=story');
    const gridButton = page.getByRole('button', { name: 'Grid' });
    const listButton = page.getByRole('button', { name: 'List' });
    await expect(gridButton).toHaveAttribute('aria-pressed', 'true');
    await listButton.click();
    await expect(listButton).toHaveAttribute('aria-pressed', 'true');
    await expect(gridButton).toHaveAttribute('aria-pressed', 'false');
  });
});
