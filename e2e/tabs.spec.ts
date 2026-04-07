import { test, expect } from '@playwright/test';

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tabs--default&viewMode=story');
  });

  test('should render tab list', async ({ page }) => {
    const tablist = page.getByRole('tablist');
    await expect(tablist).toBeVisible();
  });

  test('should render all tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Account' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Documents' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Settings' })).toBeVisible();
  });

  test('should have first tab selected by default', async ({ page }) => {
    const firstTab = page.getByRole('tab', { name: 'Account' });
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should show corresponding panel content', async ({ page }) => {
    const panel = page.getByRole('tabpanel');
    await expect(panel).toContainText('Account Settings');
  });

  test('should switch tabs on click', async ({ page }) => {
    const documentsTab = page.getByRole('tab', { name: 'Documents' });
    await documentsTab.click();
    await expect(documentsTab).toHaveAttribute('aria-selected', 'true');
    const panel = page.getByRole('tabpanel');
    await expect(panel).toContainText('Documents');
  });

  test('should navigate tabs with arrow keys', async ({ page }) => {
    const firstTab = page.getByRole('tab', { name: 'Account' });
    await firstTab.focus();
    await page.keyboard.press('ArrowRight');
    const documentsTab = page.getByRole('tab', { name: 'Documents' });
    await expect(documentsTab).toBeFocused();
    await expect(documentsTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should wrap around with arrow keys', async ({ page }) => {
    const settingsTab = page.getByRole('tab', { name: 'Settings' });
    await settingsTab.click();
    await settingsTab.focus();
    await page.keyboard.press('ArrowRight');
    const accountTab = page.getByRole('tab', { name: 'Account' });
    await expect(accountTab).toBeFocused();
  });

  test('should have aria-controls linking tab to panel', async ({ page }) => {
    const firstTab = page.getByRole('tab', { name: 'Account' });
    const panelId = await firstTab.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = page.locator(`#${panelId}`);
    await expect(panel).toHaveAttribute('role', 'tabpanel');
  });

  test('disabled tab should not be selectable', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tabs--with-disabled-tab&viewMode=story');
    const disabledTab = page.getByRole('tab', { name: 'Disabled' });
    await expect(disabledTab).toBeDisabled();
  });

  test('should support default index', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-tabs--default-index&viewMode=story');
    const secondTab = page.getByRole('tab', { name: 'Second (Default)' });
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });
});
