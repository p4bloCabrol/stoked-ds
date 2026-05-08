# stoked-ds — Design Tokens

All tokens are CSS custom properties in `src/tokens/`. **Always use tokens — never hardcode values.**

## Colors

```
Palette scales: --stoked-{color}-{50|100|200|300|400|500|600|700|800|900}
Colors available: slate, primary, success, warning, danger

Semantic aliases (auto-switch dark/light):
  --stoked-color-primary          (#137fec)
  --stoked-color-primary-hover    (400 dark / 600 light)
  --stoked-color-primary-active   (600 dark / 700 light)
  --stoked-color-primary-light    (rgba 10%)
  --stoked-color-primary-muted    (rgba 30%)
  --stoked-color-success           (#10b981)
  --stoked-color-warning           (#f59e0b)
  --stoked-color-danger            (#f43f5e)

Surfaces:
  --stoked-color-background        (dark: #101922 / light: #f6f7f8)
  --stoked-color-background-alt    (dark: #0a0f14 / light: #ffffff)
  --stoked-color-surface           (dark: #1e293b / light: #ffffff)
  --stoked-color-surface-raised    (dark: #16202b / light: #ffffff)
  --stoked-color-surface-overlay   (dark: rgba(0,0,0,0.5) / light: rgba(0,0,0,0.3))

Borders:
  --stoked-color-border            (dark: #334155 / light: #e2e8f0)
  --stoked-color-border-muted
  --stoked-color-border-strong

Text:
  --stoked-color-text              (dark: #f8fafc / light: #0f172a)
  --stoked-color-text-secondary    (#94a3b8 / #475569)
  --stoked-color-text-muted        (#64748b)
  --stoked-color-text-disabled     (#475569 / #94a3b8)
  --stoked-color-text-inverse      (opposite of text)

Focus:
  --stoked-color-focus-ring
  --stoked-color-focus-ring-offset
```

## Spacing (4px base)

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

## Typography

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
  --stoked-leading-tight 1.25   --stoked-leading-normal 1.5   --stoked-leading-relaxed 1.625
```

## Borders

```
Radius:
  --stoked-radius-sm    4px    (subtle)
  --stoked-radius-md    6px
  --stoked-radius-lg    8px    (buttons, inputs)
  --stoked-radius-xl    12px   (cards, containers)
  --stoked-radius-2xl   16px   (modals)
  --stoked-radius-full  9999px (avatars, pills)

Widths:
  --stoked-border-width-thin   1px
  --stoked-border-width-medium 2px
```

## Shadows

```
--stoked-shadow-xs / sm / md / lg / xl / 2xl
--stoked-shadow-inner
--stoked-shadow-primary      (blue glow)
--stoked-shadow-primary-lg
--stoked-shadow-success      (green glow)
--stoked-shadow-danger       (red glow)
```

## Transitions

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

## Z-Index

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

## Size system (consistent across all components)

| Size | Height | Padding X | Font Size | Icon Size |
|------|--------|-----------|-----------|-----------|
| `sm` | spacing-8 (32px) | spacing-3 (12px) | text-sm (12px) | 14px |
| `md` | spacing-10 (40px) | spacing-4 (16px) | text-base (14px) | 16px |
| `lg` | spacing-12 (48px) | spacing-6 (24px) | text-md (16px) | 18px |

## Visual conventions

**Layout:** background → `--stoked-color-background`, surface cards → `--stoked-color-surface` + `--stoked-radius-xl` + `--stoked-shadow-md`, border → `--stoked-border-width-thin solid var(--stoked-color-border)`

**Interactive:** radius → `--stoked-radius-lg`, hover → subtle shadow, active → `scale(0.95)`, focus → `outline: 2px solid var(--stoked-color-focus-ring); outline-offset: 2px`, disabled → `opacity: 0.5; cursor: not-allowed; pointer-events: none`

**Text:** headings → `--stoked-font-bold` + `--stoked-color-text`, secondary → `--stoked-color-text-secondary`, muted → `--stoked-color-text-muted`
