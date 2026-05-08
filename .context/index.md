# stoked-ds — Context Index

> Router for AI agents. Load only the slice you need — never load all files at once.

## When to load each file

| Task | Load |
|------|------|
| Styling a component, using CSS tokens | [tokens.md](tokens.md) |
| Creating or modifying a component | [patterns.md](patterns.md) |
| Writing unit tests | [testing.md](testing.md) |
| Writing Storybook stories | [stories.md](stories.md) |
| Adding ARIA / keyboard nav | [a11y.md](a11y.md) |
| Checking what components exist | [components.md](components.md) |
| Understanding project direction | [roadmap.md](roadmap.md) |
| Creating a new component end-to-end | [patterns.md](patterns.md) + [tokens.md](tokens.md) + [a11y.md](a11y.md) |

## Project identity

- **Name**: stoked-ds | **Version**: 0.6.0 | **License**: MIT
- **Philosophy**: Lightweight, accessible React design system with zero-runtime CSS
- **Stack**: React 18, TypeScript 5.7 (strict), CSS Modules, Vite 7, Storybook 10, Vitest 4, Playwright 1.58
- **Only production dep**: clsx
- **Theming**: dark mode default (`:root`), light via `[data-theme='light']`
- **Branching**: never push to `main` — always `feat/`, `fix/`, `docs/` branches + PR

## Quick rules (always apply)

- Use `var(--stoked-*)` tokens for ALL visual values — never hardcode
- Use `data-*` attributes for variants/states — never CSS class toggles
- `forwardRef` on every component, named exports only, always set `displayName`
- Animations in CSS only (`@keyframes`, `transition`) — zero JS animation libraries
