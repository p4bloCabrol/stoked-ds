# stoked-ds — Testing Patterns

## Stack

- **Unit tests**: Vitest + `@testing-library/react` + `@testing-library/user-event`
- **E2E tests**: Playwright (runs against Storybook on port 6006)
- **Config**: `vitest.config.ts`, `playwright.config.ts`

## Unit test template

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render with default props', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByRole('...')).toBeInTheDocument();
    expect(screen.getByRole('...')).toHaveAttribute('data-variant', 'solid');
    expect(screen.getByRole('...')).toHaveAttribute('data-size', 'md');
  });

  it('should apply variant data attribute', () => {
    render(<ComponentName variant="outline">Content</ComponentName>);
    expect(screen.getByRole('...')).toHaveAttribute('data-variant', 'outline');
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ComponentName onClick={onClick}>Content</ComponentName>);
    await user.click(screen.getByRole('...'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should not respond when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ComponentName disabled onClick={onClick}>Content</ComponentName>);
    await user.click(screen.getByRole('...'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should have correct ARIA attributes', () => { /* ... */ });

  it('should respond to keyboard interaction', async () => { /* ... */ });
});
```

## Rules

- Use `userEvent` — **never** `fireEvent`
- Query by role first (`getByRole`), then by label (`getByLabelText`), then by text (`getByText`)
- Use `vi.fn()` for callbacks, assert with `toHaveBeenCalledOnce()`
- Test coverage for every component: default render, each variant, interactions, disabled state, a11y, keyboard nav

## E2E tests

- Live in `e2e/`, one file per component
- Story IDs follow the format: `{title-kebab}--{story-kebab}`
- Run with `pnpm test:e2e` (requires Storybook running on port 6006)
- If failing with `importers[path] is not a function`, clear cache: `rm -rf node_modules/.cache/storybook`

## Commands

```bash
pnpm test          # run all unit tests
pnpm test:watch    # watch mode
pnpm test:e2e      # Playwright E2E
```
