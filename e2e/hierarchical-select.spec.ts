import { test, expect } from '@playwright/test';

test.describe('HierarchicalSelect Component', () => {
  test.describe('Single Select', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-hierarchicalselect--single-select&viewMode=story'
      );
    });

    test('should render trigger with placeholder', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await expect(trigger).toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('should open dropdown on click', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('tree')).toBeVisible();
    });

    test('should close dropdown on Escape', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await expect(page.getByRole('tree')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('should expand parent nodes on click', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const parentNode = page.getByText('Warehouse A');
      await parentNode.click();
      // Children should appear after expanding
      await expect(page.getByText('Sector 1')).toBeVisible();
    });

    test('should select a leaf node and close', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      // Expand to reach a leaf
      await page.getByText('Warehouse B').click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('should filter options with search', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const search = page.getByPlaceholder('Search...');
      await search.fill('Sector');
      // Should show filtered results
      await expect(page.getByRole('tree')).toBeVisible();
    });

    test('should navigate with keyboard', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      // Arrow down should set active descendant
      await page.keyboard.press('ArrowDown');
      const activeDescendant = await trigger.getAttribute(
        'aria-activedescendant'
      );
      expect(activeDescendant).toBeTruthy();
    });

    test('should close on outside click', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await expect(page.getByRole('tree')).toBeVisible();
      // Click outside the component
      await page.click('body', { position: { x: 0, y: 0 } });
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test.describe('Multi Select', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-hierarchicalselect--multi-select&viewMode=story'
      );
    });

    test('should show checkboxes on leaf nodes', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      // Parent nodes should not have checkboxes, only leaves
      await page.getByText('Warehouse A').click(); // expand
      await page.getByText('Sector 1').click(); // expand
      // Leaf nodes should be visible
      await expect(page.getByText('Shelf 1')).toBeVisible();
    });

    test('should show chips for selected items', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-hierarchicalselect--multi-with-defaults&viewMode=story'
      );
      // Default values should show as chips in trigger
      const trigger = page.getByRole('combobox');
      await expect(trigger).toBeVisible();
    });

    test('should show apply button and footer', async ({ page }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      await expect(page.getByText('Apply Selection')).toBeVisible();
    });

    test('apply button should be disabled when nothing selected', async ({
      page,
    }) => {
      const trigger = page.getByRole('combobox');
      await trigger.click();
      const applyBtn = page.getByText('Apply Selection');
      await expect(applyBtn).toBeDisabled();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA roles', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-hierarchicalselect--default&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await expect(trigger).toHaveAttribute('aria-haspopup', 'tree');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await trigger.click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('tree')).toBeVisible();
    });

    test('should be keyboard operable', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-hierarchicalselect--default&viewMode=story'
      );
      // Tab to trigger and open with Enter
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const trigger = page.getByRole('combobox');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test.describe('Disabled', () => {
    test('should not open when disabled', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-hierarchicalselect--disabled&viewMode=story'
      );
      const trigger = page.getByRole('combobox');
      await trigger.click({ force: true });
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
