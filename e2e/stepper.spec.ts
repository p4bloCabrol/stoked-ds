import { test, expect } from '@playwright/test';

test.describe('Stepper Component', () => {
  test.describe('Basic Rendering', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--default&viewMode=story'
      );
    });

    test('should render all steps', async ({ page }) => {
      const steps = page.locator('[data-status]');
      const count = await steps.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should show active step with correct status', async ({ page }) => {
      const activeStep = page.locator('[data-status="active"]');
      await expect(activeStep).toBeVisible();
    });

    test('should show completed steps before active', async ({ page }) => {
      const completedSteps = page.locator('[data-status="completed"]');
      const count = await completedSteps.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should show pending steps after active', async ({ page }) => {
      const pendingSteps = page.locator('[data-status="pending"]');
      const count = await pendingSteps.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Step Status', () => {
    test('should show all steps completed', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--all-completed&viewMode=story'
      );
      const completedSteps = page.locator('[data-status="completed"]');
      const count = await completedSteps.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should show first step as active', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--first-step&viewMode=story'
      );
      const activeStep = page.locator('[data-status="active"]').first();
      await expect(activeStep).toBeVisible();
      // No completed steps should exist
      const completedSteps = page.locator('[data-status="completed"]');
      const count = await completedSteps.count();
      expect(count).toBe(0);
    });

    test('should show error state', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--with-error&viewMode=story'
      );
      const errorStep = page.locator('[data-status="error"]');
      await expect(errorStep).toBeVisible();
    });
  });

  test.describe('Clickable', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--clickable&viewMode=story'
      );
    });

    test('should have clickable steps', async ({ page }) => {
      const steps = page.locator('[data-clickable="true"]');
      const count = await steps.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should change active step on click', async ({ page }) => {
      // Click on first step
      const firstStep = page.locator('[data-clickable="true"]').first();
      await firstStep.click();
      // First step should now be active
      await expect(firstStep).toHaveAttribute('data-status', 'active');
    });

    test('should allow clicking any step freely', async ({ page }) => {
      const steps = page.locator('[data-clickable="true"]');
      const count = await steps.count();
      if (count >= 3) {
        // Click last step
        await steps.nth(count - 1).click();
        // Click first step
        await steps.first().click();
        await expect(steps.first()).toHaveAttribute('data-status', 'active');
        // Click middle step
        await steps.nth(1).click();
        await expect(steps.nth(1)).toHaveAttribute('data-status', 'active');
      }
    });
  });

  test.describe('Vertical', () => {
    test('should render in vertical orientation', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--vertical&viewMode=story'
      );
      const stepper = page.locator('[data-orientation="vertical"]');
      await expect(stepper).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--default&viewMode=story'
      );
      // Stepper should have proper role
      const stepper = page.locator('[role="list"]');
      await expect(stepper).toBeVisible();
      // Steps should have listitem role
      const items = page.locator('[role="listitem"]');
      const count = await items.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('clickable steps should be keyboard accessible', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--clickable&viewMode=story'
      );
      // Tab through steps
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });
  });

  test.describe('Sizes', () => {
    test('should render in different sizes', async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-stepper--sizes&viewMode=story'
      );
      // Should render the size variants
      const smallStepper = page.locator('[data-size="sm"]').first();
      const medStepper = page.locator('[data-size="md"]').first();
      const lgStepper = page.locator('[data-size="lg"]').first();
      await expect(smallStepper).toBeVisible();
      await expect(medStepper).toBeVisible();
      await expect(lgStepper).toBeVisible();
    });
  });
});
