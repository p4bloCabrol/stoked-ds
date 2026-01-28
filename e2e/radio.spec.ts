import { test, expect } from '@playwright/test';

test.describe('Radio Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-radio--group-vertical&viewMode=story');
  });

  test('should render radio group', async ({ page }) => {
    const radioGroup = page.getByRole('radiogroup');
    await expect(radioGroup).toBeVisible();
  });

  test('should have default selection', async ({ page }) => {
    const proRadio = page.getByRole('radio', { name: 'Pro' });
    await expect(proRadio).toBeChecked();
  });

  test('should change selection on click', async ({ page }) => {
    const freeRadio = page.getByRole('radio', { name: 'Free' });
    const proRadio = page.getByRole('radio', { name: 'Pro' });

    await freeRadio.click();
    await expect(freeRadio).toBeChecked();
    await expect(proRadio).not.toBeChecked();
  });

  test('should only allow one selection', async ({ page }) => {
    const radios = page.getByRole('radio');
    const count = await radios.count();

    for (let i = 0; i < count; i++) {
      await radios.nth(i).click();
      const checkedCount = await page.locator('input[type="radio"]:checked').count();
      expect(checkedCount).toBe(1);
    }
  });

  test('should be navigable with keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const proRadio = page.getByRole('radio', { name: 'Pro' });
    await expect(proRadio).toBeFocused();
  });
});
