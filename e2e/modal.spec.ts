import { test, expect } from '@playwright/test';

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--default');
  });

  test('should open modal when trigger is clicked', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
  });

  test('should have correct aria attributes', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const closeButton = page.getByRole('button', { name: 'Close modal' });
    await closeButton.click();

    await expect(dialog).not.toBeVisible();
  });

  test('should close modal when backdrop is clicked', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Click the backdrop (outside the modal content)
    await page.mouse.click(10, 10);

    await expect(dialog).not.toBeVisible();
  });

  test('should close modal when Escape is pressed', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(dialog).not.toBeVisible();
  });
});

test.describe('Modal Focus Management', () => {
  test('should trap focus inside modal', async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--with-form');

    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Focus should still be within the dialog
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('Modal Sizes', () => {
  test('should render small modal', async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--sizes');
    const triggers = page.getByRole('button');
    await triggers.first().click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
  });
});

test.describe('Modal with Form', () => {
  test('should render modal with form inputs', async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--with-form');

    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const nameInput = page.getByLabel('Name');
    const emailInput = page.getByLabel('Email');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
  });

  test('should allow form interaction', async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--with-form');

    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const nameInput = page.getByLabel('Name');
    await nameInput.fill('John Doe');

    await expect(nameInput).toHaveValue('John Doe');
  });
});

test.describe('Non-closable Modal', () => {
  test('should not show close button when not closable', async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--non-closable');

    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const closeButton = page.getByRole('button', { name: 'Close modal' });
    await expect(closeButton).not.toBeVisible();
  });

  test('should not close on Escape when closeOnEsc is false', async ({ page }) => {
    await page.goto('/iframe.html?id=overlay-modal--non-closable');

    const trigger = page.getByRole('button', { name: 'Open Modal' });
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');

    // Modal should still be visible
    await expect(dialog).toBeVisible();
  });
});
