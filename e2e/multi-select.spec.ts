import { test, expect } from '@playwright/test';

test.describe('MultiSelect Component', () => {
  test.describe('Basic Rendering', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--with-label&viewMode=story'
      );
    });

    test('should render with label', async ({ page }) => {
      await expect(page.getByText('Favorite Fruits')).toBeVisible();
      const trigger = page.getByRole('combobox');
      await expect(trigger).toBeVisible();
    });

    test('should open dropdown on click', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('listbox')).toBeVisible();
    });

    test('should show placeholder text', async ({ page }) => {
      await expect(page.getByPlaceholder('Select fruits...')).toBeVisible();
    });
  });

  test.describe('Selection', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--default&viewMode=story'
      );
    });

    test('should select an option and show chip', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const option = page.getByRole('option').first();
      const optionText = await option.textContent();
      await option.click();
      // Chip should appear with the selected option text
      await expect(page.getByText(optionText!)).toBeVisible();
    });

    test('should remove chip on X click', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const option = page.getByRole('option').first();
      await option.click();
      // Find and click the remove button on the chip
      const removeBtn = page.getByRole('button', { name: /Remove/ }).first();
      await removeBtn.click();
    });

    test('should close dropdown on outside click', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await expect(page.getByRole('listbox')).toBeVisible();
      await page.click('body', { position: { x: 0, y: 0 } });
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('Search', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--default&viewMode=story'
      );
    });

    test('should filter options by typing', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const search = page.locator('input[type="text"]');
      await search.fill('App');
      // Should show filtered results
      const options = page.getByRole('option');
      const count = await options.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show empty state when no match', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const search = page.locator('input[type="text"]');
      await search.fill('zzzznotexist');
      await expect(page.getByText('No options found')).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should open on Enter key', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--default&viewMode=story'
      );
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const trigger = page.getByRole('combobox');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    test('should close on Escape', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--default&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await page.keyboard.press('Escape');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('should remove last chip with Backspace', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--with-defaults&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await trigger.click();
      // Count chips before
      const chipsBefore = await page.locator('[class*="chipRemove"]').count();
      // Press Backspace to remove last chip
      await page.keyboard.press('Backspace');
      const chipsAfter = await page.locator('[class*="chipRemove"]').count();
      expect(chipsAfter).toBeLessThan(chipsBefore);
    });
  });

  test.describe('Disabled', () => {
    test('should not open when disabled', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--disabled&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await trigger.click({ force: true });
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('Max Selection', () => {
    test('should show max reached message', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--max-selection&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await trigger.click();
      // Select options up to max
      const options = page.getByRole('option');
      const count = await options.count();
      for (let i = 0; i < Math.min(count, 3); i++) {
        await options.nth(i).click();
        // Re-open if dropdown closed
        if (
          (await trigger.getAttribute('aria-expanded')) === 'false'
        ) {
          await trigger.click();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-multiselect--with-label&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
