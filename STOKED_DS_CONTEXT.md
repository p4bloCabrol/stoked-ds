# stoked-ds — Design System Context

> This document is the single source of truth for building components in stoked-ds.
> Use it as context for AI tools (Stitch, Claude, Cursor) to ensure every new component
> follows the same patterns, conventions, and quality bar as the existing 27 components.

---

## 1. Project Identity

- **Name**: stoked-ds
- **Version**: 0.4.0
- **Philosophy**: Lightweight, accessible React design system with zero-runtime CSS
- **License**: MIT
- **Repo**: github.com/p4bloCabrol/stoked-ds
- **npm**: npmjs.com/package/stoked-ds

---

## 2. Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18+ | UI library |
| TypeScript | 5.7+ | Static typing (strict mode) |
| CSS Modules | — | Scoped styles (zero-runtime) |
| Vite | 7+ | Build & dev server |
| Storybook | 10+ | Documentation & development |
| Vitest | 4+ | Unit testing |
| Playwright | 1.58+ | E2E testing |
| clsx | 2+ | Only production dependency |

---

## 3. Design Tokens

All tokens are CSS custom properties defined in `src/tokens/`. Use them **always** — never hardcode values.

### 3.1 Colors

```
Palette scales: --stoked-{color}-{50|100|200|300|400|500|600|700|800|900}
Colors: slate, primary, success, warning, danger

Semantic aliases (auto-switch dark/light):
  --stoked-color-primary          (#137fec)
  --stoked-color-primary-hover    (400 dark, 600 light)
  --stoked-color-primary-active   (600 dark, 700 light)
  --stoked-color-primary-light    (rgba 10%)
  --stoked-color-primary-muted    (rgba 30%)
  --stoked-color-success           (#10b981)
  --stoked-color-warning           (#f59e0b)
  --stoked-color-danger            (#f43f5e)

Surfaces:
  --stoked-color-background        (dark: #101922, light: #f6f7f8)
  --stoked-color-background-alt    (dark: #0a0f14, light: #ffffff)
  --stoked-color-surface           (dark: #1e293b, light: #ffffff)
  --stoked-color-surface-raised    (dark: #16202b, light: #ffffff)
  --stoked-color-surface-overlay   (dark: rgba(0,0,0,0.5), light: rgba(0,0,0,0.3))

Borders:
  --stoked-color-border            (dark: #334155, light: #e2e8f0)
  --stoked-color-border-muted
  --stoked-color-border-strong

Text:
  --stoked-color-text              (dark: #f8fafc, light: #0f172a)
  --stoked-color-text-secondary    (#94a3b8 / #475569)
  --stoked-color-text-muted        (#64748b)
  --stoked-color-text-disabled     (#475569 / #94a3b8)
  --stoked-color-text-inverse      (opposite of text)

Focus:
  --stoked-color-focus-ring
  --stoked-color-focus-ring-offset
```

### 3.2 Spacing (4px base)

```
--stoked-spacing-0     0
--stoked-spacing-0-5   2px
--stoked-spacing-1     4px
--stoked-spacing-1-5   6px
--stoked-spacing-2     8px
--stoked-spacing-3     12px
--stoked-spacing-4     16px
--stoked-spacing-5     20px
--stoked-spacing-6     24px
--stoked-spacing-8     32px
--stoked-spacing-10    40px
--stoked-spacing-12    48px
--stoked-spacing-16    64px
--stoked-spacing-20    80px
--stoked-spacing-24    96px
```

### 3.3 Typography

```
Families:
  --stoked-font-sans     Inter, system-ui, sans-serif
  --stoked-font-display  Manrope, var(--stoked-font-sans)
  --stoked-font-mono     JetBrains Mono, ui-monospace, monospace

Sizes:
  --stoked-text-xs    10px    --stoked-text-sm    12px
  --stoked-text-base  14px    --stoked-text-md    16px
  --stoked-text-lg    18px    --stoked-text-xl    20px
  --stoked-text-2xl   24px    --stoked-text-3xl   30px

Weights:
  --stoked-font-normal 400   --stoked-font-medium 500
  --stoked-font-semibold 600 --stoked-font-bold 700

Line heights:
  --stoked-leading-tight 1.25   --stoked-leading-normal 1.5
  --stoked-leading-relaxed 1.625
```

### 3.4 Borders

```
Radius:
  --stoked-radius-sm    4px   (subtle)
  --stoked-radius-md    6px
  --stoked-radius-lg    8px   (buttons, inputs)
  --stoked-radius-xl    12px  (cards, containers)
  --stoked-radius-2xl   16px  (modals)
  --stoked-radius-full  9999px (avatars, pills)

Widths:
  --stoked-border-width-thin   1px
  --stoked-border-width-medium 2px
```

### 3.5 Shadows

```
--stoked-shadow-xs / sm / md / lg / xl / 2xl
--stoked-shadow-inner
--stoked-shadow-primary       (blue glow)
--stoked-shadow-primary-lg
--stoked-shadow-success       (green glow)
--stoked-shadow-danger        (red glow)
```

### 3.6 Transitions

```
Durations:
  --stoked-duration-fast    100ms
  --stoked-duration-normal  200ms
  --stoked-duration-slow    300ms
  --stoked-duration-slower  500ms

Easings:
  --stoked-easing-default   cubic-bezier(0.4, 0, 0.2, 1)
  --stoked-easing-in        cubic-bezier(0.4, 0, 1, 1)
  --stoked-easing-out       cubic-bezier(0, 0, 0.2, 1)
  --stoked-easing-bounce    cubic-bezier(0.68, -0.55, 0.265, 1.55)

Presets:
  --stoked-transition-colors     (color, bg, border, shadow)
  --stoked-transition-transform
  --stoked-transition-all
```

### 3.7 Z-Index

```
--stoked-z-base       0
--stoked-z-docked     10
--stoked-z-dropdown   1000
--stoked-z-sticky     1100
--stoked-z-overlay    1300
--stoked-z-modal      1400
--stoked-z-popover    1500
--stoked-z-tooltip    1600
--stoked-z-toast      1700
```

### 3.8 Theming

- **Dark mode** is the default (`:root`)
- **Light mode** via `[data-theme='light']` on any parent element
- All semantic tokens auto-switch — components don't need JS logic for themes
- Never use raw palette values in components; always use semantic tokens

---

## 4. Component Architecture

### 4.1 File Structure (mandatory for every component)

```
src/components/ComponentName/
├── ComponentName.tsx           # Implementation
├── ComponentName.types.ts      # Types & interfaces
├── ComponentName.module.css    # Styles
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests
└── index.ts                    # Re-exports
```

### 4.2 TypeScript Types Pattern

```tsx
// ComponentName.types.ts
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// Define union types for variants
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'solid' | 'outline' | 'ghost';
export type ComponentColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

// Extend native HTML element props
export interface ComponentProps extends ComponentPropsWithoutRef<'div'> {
  /** JSDoc description for each prop */
  variant?: ComponentVariant;
  size?: ComponentSize;
  color?: ComponentColor;
  disabled?: boolean;
  children?: ReactNode;
}
```

**Rules:**
- Extend `ComponentPropsWithoutRef<'element'>` for the root HTML element
- Use `Omit<>` when native prop names collide (e.g., `Omit<..., 'color'>`)
- JSDoc comment on every custom prop
- Export all types from `index.ts`

### 4.3 Component Implementation Pattern

```tsx
// ComponentName.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ComponentProps } from './ComponentName.types';
import styles from './ComponentName.module.css';

const ComponentName = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'solid', size = 'md', className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
export { ComponentName };
```

**Rules:**
- Always use `forwardRef` to expose the root element ref
- Always spread `...rest` onto the root element
- Always accept and merge `className` via `cn(styles.root, className)`
- Always set `displayName`
- Use named exports, never default exports
- Variants, sizes, colors → `data-*` attributes, never CSS class toggles
- Boolean states → `data-expanded`, `data-disabled`, `data-loading` (set to `true` or `undefined`)
- Default prop values in destructuring

### 4.4 CSS Module Pattern

```css
/* ComponentName.module.css */
.root {
  /* Component-level CSS variable defaults (prefixed with --_) */
  --_comp-padding: var(--stoked-spacing-4);
  --_comp-radius: var(--stoked-radius-lg);
  --_comp-font-size: var(--stoked-text-base);

  /* Use component-level vars for values */
  padding: var(--_comp-padding);
  border-radius: var(--_comp-radius);
  font-size: var(--_comp-font-size);
  font-family: var(--stoked-font-sans);
  transition: var(--stoked-transition-colors);
}

/* Size variants override component-level vars */
.root[data-size='sm'] {
  --_comp-padding: var(--stoked-spacing-2);
  --_comp-font-size: var(--stoked-text-sm);
}

.root[data-size='lg'] {
  --_comp-padding: var(--stoked-spacing-6);
  --_comp-font-size: var(--stoked-text-md);
}

/* Color variants */
.root[data-variant='solid'][data-color='primary'] {
  background-color: var(--stoked-color-primary);
  color: var(--stoked-color-text-inverse);
}

/* States */
.root:hover:not(:disabled) { }
.root:focus-visible { outline: 2px solid var(--stoked-color-focus-ring); outline-offset: 2px; }
.root:disabled, .root[data-disabled] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .root { transition: none; animation: none; }
}
```

**Rules:**
- NEVER hardcode colors, spacing, radii, shadows, font sizes — always use tokens
- Component-level CSS vars use `--_` prefix (private convention)
- Variants via `[data-attribute='value']` selectors
- States: `:hover:not(:disabled)`, `:focus-visible`, `[data-expanded]`, `[data-disabled]`
- Always include `:focus-visible` with `outline: 2px solid var(--stoked-color-focus-ring)`
- Always include `@media (prefers-reduced-motion: reduce)` when there are animations
- Animations: CSS `@keyframes` and `transition` only — ZERO JavaScript animation libraries
- Define `@keyframes` inside the same `.module.css` file (CSS Modules scopes them)

### 4.5 Compound Components Pattern (for complex components)

When a component has multiple related sub-components (e.g., Accordion + AccordionItem, Modal + ModalHeader + ModalBody):

```tsx
// Use React Context to share state
const ComponentContext = createContext<ContextValue | null>(null);

const useComponentContext = () => {
  const ctx = useContext(ComponentContext);
  if (!ctx) throw new Error('Child must be used within Parent');
  return ctx;
};

// Parent provides context
const Parent = forwardRef<HTMLDivElement, ParentProps>(({ children, ...rest }, ref) => {
  const [state, setState] = useState(/* ... */);
  return (
    <ComponentContext.Provider value={{ state, setState }}>
      <div ref={ref} {...rest}>{children}</div>
    </ComponentContext.Provider>
  );
});

// Children consume context
const Child = forwardRef<HTMLDivElement, ChildProps>((props, ref) => {
  const { state } = useComponentContext();
  // ...
});
```

### 4.6 Exit Animations Pattern

For components that mount/unmount with animation (Modal, Toast, Dropdown):

```tsx
import { useExitAnimation } from '../../utils/useExitAnimation';

function AnimatedComponent({ isOpen, onClose }) {
  const { shouldRender, animationState, onAnimationEnd } = useExitAnimation(isOpen, 200);

  if (!shouldRender) return null;

  return (
    <div data-state={animationState} onAnimationEnd={onAnimationEnd}>
      {/* content */}
    </div>
  );
}
```

```css
.overlay[data-state='entering'],
.overlay[data-state='entered'] { opacity: 1; }
.overlay[data-state='exiting'] { opacity: 0; transition: opacity 200ms var(--stoked-easing-out); }
```

### 4.7 Controlled/Uncontrolled Pattern

For form-like components that can be both controlled and uncontrolled:

```tsx
import { useControllable } from '../../utils/useControllable';

function Toggle({ value, defaultValue = false, onChange }) {
  const [isOn, setIsOn] = useControllable(value, defaultValue, onChange);
  // Use isOn and setIsOn — hook handles both modes
}
```

### 4.8 index.ts Re-export Pattern

```tsx
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentProps, ComponentVariant, ComponentSize } from './ComponentName.types';
```

---

## 5. Available Utilities

| Utility | Import | Purpose |
|---------|--------|---------|
| `cn()` | `../../utils/cn` | Merge CSS classes (clsx wrapper) |
| `useId()` | `../../utils/useId` | Generate unique IDs for a11y (prefix optional) |
| `useControllable()` | `../../utils/useControllable` | Controlled/uncontrolled state management |
| `useExitAnimation()` | `../../utils/useExitAnimation` | CSS exit animation orchestration |
| `mergeRefs()` | `../../utils/mergeRefs` | Combine multiple refs into one |

---

## 6. Accessibility Checklist

Every component MUST implement:

- [ ] Correct ARIA role (`role="dialog"`, `role="button"`, `role="region"`, etc.)
- [ ] `aria-expanded` for collapsible content
- [ ] `aria-controls` linking trigger to content panel
- [ ] `aria-label` or `aria-labelledby` for non-text elements
- [ ] `aria-disabled` for disabled states (in addition to `disabled` attribute)
- [ ] `aria-busy` for loading states
- [ ] `aria-hidden="true"` on decorative icons and elements
- [ ] Keyboard navigation: Enter, Space, Escape, Arrow keys where appropriate
- [ ] Focus management: `tabIndex`, `:focus-visible` styles, focus trap for modals
- [ ] `@media (prefers-reduced-motion: reduce)` disabling animations
- [ ] Unique IDs via `useId()` for aria-controls/labelledby linkage

---

## 7. Testing Pattern

```tsx
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // 1. Default rendering
  it('should render with default props', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByRole('...')).toBeInTheDocument();
    expect(screen.getByRole('...')).toHaveAttribute('data-variant', 'solid');
    expect(screen.getByRole('...')).toHaveAttribute('data-size', 'md');
  });

  // 2. Variants
  it('should apply variant data attribute', () => {
    render(<ComponentName variant="outline">Content</ComponentName>);
    expect(screen.getByRole('...')).toHaveAttribute('data-variant', 'outline');
  });

  // 3. User interactions
  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ComponentName onClick={onClick}>Content</ComponentName>);
    await user.click(screen.getByRole('...'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  // 4. Disabled state
  it('should not respond when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ComponentName disabled onClick={onClick}>Content</ComponentName>);
    await user.click(screen.getByRole('...'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // 5. Accessibility
  it('should have correct ARIA attributes', () => { /* ... */ });

  // 6. Keyboard navigation
  it('should respond to keyboard interaction', async () => { /* ... */ });
});
```

**Rules:**
- Use `@testing-library/react` + `userEvent` (not fireEvent)
- Use `vitest` (describe, it, expect, vi)
- Query by role first (`getByRole`), then by label, then by text
- Test: default render, each variant, interactions, disabled state, a11y, keyboard
- Use `vi.fn()` for callbacks, `toHaveBeenCalledOnce()`

---

## 8. Storybook Story Pattern

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Default content',
    variant: 'solid',
    size: 'md',
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <ComponentName {...args} variant="solid">Solid</ComponentName>
      <ComponentName {...args} variant="outline">Outline</ComponentName>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <ComponentName {...args} size="sm">Small</ComponentName>
      <ComponentName {...args} size="md">Medium</ComponentName>
      <ComponentName {...args} size="lg">Large</ComponentName>
    </div>
  ),
};
```

**Rules:**
- `title: 'Components/ComponentName'` (category/name)
- Use `satisfies Meta<typeof Component>` for type safety
- `tags: ['autodocs']` for auto-generated docs
- Always include: Default, Variants, Sizes stories
- Use `argTypes` with controls for interactive props

---

## 9. Size System (consistent across all components)

| Size | Height | Padding X | Font Size | Icon Size |
|------|--------|-----------|-----------|-----------|
| `sm` | spacing-8 (32px) | spacing-3 (12px) | text-sm (12px) | 14px |
| `md` | spacing-10 (40px) | spacing-4 (16px) | text-base (14px) | 16px |
| `lg` | spacing-12 (48px) | spacing-6 (24px) | text-md (16px) | 18px |

---

## 10. Visual Conventions

### Layout
- Background: `--stoked-color-background`
- Surface cards: `--stoked-color-surface` + `--stoked-radius-xl` + `--stoked-shadow-md`
- Border: `--stoked-border-width-thin solid var(--stoked-color-border)`
- Content spacing: `--stoked-spacing-4` to `--stoked-spacing-6`
- Gap between items: `--stoked-spacing-2` to `--stoked-spacing-3`

### Interactive Elements
- Default border-radius: `--stoked-radius-lg` (8px)
- Hover: lighter/darker shade, subtle shadow increase
- Active: `transform: scale(0.95)` or `scale(0.98)`
- Focus: `outline: 2px solid var(--stoked-color-focus-ring); outline-offset: 2px`
- Disabled: `opacity: 0.5; cursor: not-allowed; pointer-events: none`
- Transitions: `var(--stoked-transition-colors)` on all interactive elements

### Text Hierarchy
- Headings: `--stoked-font-bold`, `--stoked-color-text`
- Body: `--stoked-font-normal`, `--stoked-color-text`
- Secondary: `--stoked-color-text-secondary`
- Muted/Placeholder: `--stoked-color-text-muted`

---

## 11. Existing Components (27)

### Form Controls (8)
Button, Input, SearchInput, Checkbox, Radio/RadioGroup, Select, Switch, ButtonGroup

### Feedback (7)
Alert, Modal, Toast/ToastProvider, Spinner, Progress, Skeleton, Tooltip

### Data Display (8)
Badge, Tag, Avatar, Card, StatCard, Accordion, Tabs, Table

### Layout (2)
Sidebar, AppShell

### Navigation (2)
Breadcrumb, Pagination

---

## 12. Roadmap (from White Paper)

### Phase 1: Foundation (v0.1–v0.3) — COMPLETED
27 components, 214 tokens, dark/light themes, 5 integrations, Storybook docs, landing page.

### Phase 2: Hardening & Visibility (v0.4) — COMPLETED
Trusted Publishers (OIDC), provenance, CycloneDX SBOM, npm audit in CI, Dependabot, SEO, README badges, white paper.

### Phase 3: High-Demand Components (v0.5) — NEXT
- **TreeView** — Hierarchical tree with expand/collapse, selection, keyboard nav
- **MultiSelect (pills)** — Multi-select input with pill/chip tags, removable items
- **Hierarchical Select** — Nested dropdown with parent/child option levels
- **Stepper** — Step wizard with active/completed/error states, horizontal/vertical
- **CommandPalette** — Cmd+K search dialog with sections, keyboard navigation
- **Transfer** — Dual-list component for moving items between source and target

### Phase 4: Headless Mode (v0.6)
Behavior-only primitives, dual export (styled + headless), custom theming.

### Phase 5: Premium Integrations (v0.7)
TipTap, AG Grid, React DnD Kit, Uppy.

### Phase 6: DX & Ecosystem (v1.0)
MCP Server, CLI scaffolding, Figma token sync, React Flow integration, stable API.

---

## 13. Security & Quality Pipeline

- `npm run lint` — ESLint 9
- `npm run typecheck` — TypeScript strict mode
- `npm run test` — Vitest (332+ unit tests)
- `npm run build` — tsc + Vite build
- CI: lint → typecheck → test → build on every PR
- Publish: quality checks → validate tarball → generate SBOM → publish with `--provenance`
- Dependabot: weekly grouped PRs
- npm audit: blocks on high/critical vulnerabilities

---

## 14. Branching & Workflow

- NEVER push directly to `main`
- Branch naming: `feat/<name>`, `fix/<name>`, `docs/<name>`, `release/vX.X.X`
- Always create PR with `gh pr create`
- CI must pass before merge

---

## 15. Do's and Don'ts

### DO
- Use design tokens for ALL visual values
- Use `data-*` attributes for variants and states
- Use `forwardRef` on every component
- Include ARIA attributes for accessibility
- Test every variant, interaction, and disabled state
- Include `@media (prefers-reduced-motion: reduce)`
- Keep animations in CSS (keyframes + transitions)
- Set `displayName` on every component
- Export types alongside components

### DON'T
- Don't use CSS-in-JS or any runtime styling
- Don't hardcode colors, spacing, or font sizes
- Don't use CSS class toggles for variants (use data attributes)
- Don't use default exports
- Don't add JavaScript animation libraries
- Don't skip accessibility
- Don't create components without tests and stories
- Don't use `fireEvent` (use `userEvent`)
- Don't use inline styles in components (only in stories for layout)
