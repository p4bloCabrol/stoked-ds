# stoked-ds — Component Patterns

## File structure (mandatory)

```
src/components/ComponentName/
├── ComponentName.tsx           # Implementation
├── ComponentName.types.ts      # Types & interfaces
├── ComponentName.module.css    # Styles
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests
└── index.ts                    # Re-exports
```

## Types pattern

```tsx
// ComponentName.types.ts
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'solid' | 'outline' | 'ghost';
export type ComponentColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface ComponentProps extends ComponentPropsWithoutRef<'div'> {
  /** JSDoc on every custom prop */
  variant?: ComponentVariant;
  size?: ComponentSize;
  color?: ComponentColor;
  disabled?: boolean;
  children?: ReactNode;
}
```

Rules: extend `ComponentPropsWithoutRef<'element'>`, use `Omit<>` on collisions, JSDoc every custom prop, export all types from `index.ts`.

## Component implementation pattern

```tsx
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

Rules:
- Always `forwardRef` — always spread `...rest` — always merge `className` via `cn()`
- Always set `displayName` — named exports only, never default
- Variants/sizes/colors → `data-*` attributes, never CSS class toggles
- Boolean states → `data-expanded`, `data-disabled`, `data-loading` (value: `true` or `undefined`)
- Default prop values in destructuring

## CSS Module pattern

```css
.root {
  --_comp-padding: var(--stoked-spacing-4);   /* --_ prefix = private component var */
  --_comp-radius: var(--stoked-radius-lg);
  --_comp-font-size: var(--stoked-text-base);

  padding: var(--_comp-padding);
  border-radius: var(--_comp-radius);
  font-size: var(--_comp-font-size);
  font-family: var(--stoked-font-sans);
  transition: var(--stoked-transition-colors);
}

.root[data-size='sm'] { --_comp-padding: var(--stoked-spacing-2); --_comp-font-size: var(--stoked-text-sm); }
.root[data-size='lg'] { --_comp-padding: var(--stoked-spacing-6); --_comp-font-size: var(--stoked-text-md); }

.root[data-variant='solid'][data-color='primary'] {
  background-color: var(--stoked-color-primary);
  color: var(--stoked-color-text-inverse);
}

.root:hover:not(:disabled) { }
.root:focus-visible { outline: 2px solid var(--stoked-color-focus-ring); outline-offset: 2px; }
.root:disabled, .root[data-disabled] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .root { transition: none; animation: none; }
}
```

Rules: NEVER hardcode values — always `var(--stoked-*)`. `--_` prefix for component-level vars. Always include `:focus-visible` and `@media (prefers-reduced-motion: reduce)` when there are animations. Define `@keyframes` inside the same `.module.css`.

## Compound components pattern

```tsx
const ComponentContext = createContext<ContextValue | null>(null);

const useComponentContext = () => {
  const ctx = useContext(ComponentContext);
  if (!ctx) throw new Error('Child must be used within Parent');
  return ctx;
};

const Parent = forwardRef<HTMLDivElement, ParentProps>(({ children, ...rest }, ref) => {
  const [state, setState] = useState(/* ... */);
  return (
    <ComponentContext.Provider value={{ state, setState }}>
      <div ref={ref} {...rest}>{children}</div>
    </ComponentContext.Provider>
  );
});
```

## Exit animations pattern

```tsx
import { useExitAnimation } from '../../utils/useExitAnimation';

function AnimatedComponent({ isOpen, onClose }) {
  const { shouldRender, animationState, onAnimationEnd } = useExitAnimation(isOpen, 200);
  if (!shouldRender) return null;
  return <div data-state={animationState} onAnimationEnd={onAnimationEnd}>{/* ... */}</div>;
}
```

```css
.overlay[data-state='entering'], .overlay[data-state='entered'] { opacity: 1; }
.overlay[data-state='exiting'] { opacity: 0; transition: opacity 200ms var(--stoked-easing-out); }
```

## Controlled/Uncontrolled pattern

```tsx
import { useControllable } from '../../utils/useControllable';

function Toggle({ value, defaultValue = false, onChange }) {
  const [isOn, setIsOn] = useControllable(value, defaultValue, onChange);
}
```

## index.ts pattern

```tsx
export { ComponentName } from './ComponentName';
export type { ComponentProps, ComponentVariant, ComponentSize } from './ComponentName.types';
```

## Available utilities

| Utility | Import | Purpose |
|---------|--------|---------|
| `cn()` | `../../utils/cn` | Merge CSS classes (clsx wrapper) |
| `useId()` | `../../utils/useId` | Unique IDs for a11y |
| `useControllable()` | `../../utils/useControllable` | Controlled/uncontrolled state |
| `useExitAnimation()` | `../../utils/useExitAnimation` | CSS exit animation orchestration |
| `mergeRefs()` | `../../utils/mergeRefs` | Combine multiple refs |
