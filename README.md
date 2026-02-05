# stoked-ds

A lightweight, accessible React design system with zero-runtime CSS.

## Features

- **19 Components** - Button, Input, Select, Checkbox, Radio, Switch, Modal, Toast, Tabs, Accordion, Card, Table, Avatar, Badge, Alert, Tooltip, Spinner, Progress, Skeleton
- **Zero-runtime CSS** - CSS Modules with CSS Variables, no JavaScript runtime overhead
- **Accessible** - WAI-ARIA compliant with keyboard navigation support
- **Dark Mode** - Built-in dark theme via `data-theme` attribute
- **TypeScript** - Full type definitions included
- **Tree-shakeable** - Import only what you need

## Installation

```bash
npm install stoked-ds
```

## Quick Start

```tsx
import { Button, Input } from 'stoked-ds';
import 'stoked-ds/dist/index.css';

function App() {
  return (
    <div data-theme="dark">
      <Input placeholder="Enter your name" />
      <Button variant="solid" color="primary">
        Submit
      </Button>
    </div>
  );
}
```

## Components

### Form Controls
- `Button` - Primary actions with solid, outline, ghost, and link variants
- `Input` - Text input with label, helper text, and error states
- `Select` - Dropdown selection
- `Checkbox` - Single or multiple selection
- `Radio` / `RadioGroup` - Single selection from options
- `Switch` - Toggle on/off

### Feedback
- `Alert` - Informational messages with success, warning, error, info variants
- `Modal` - Dialog overlays
- `Toast` / `ToastProvider` - Temporary notifications
- `Spinner` - Loading indicator
- `Progress` - Progress bar with animated and indeterminate states
- `Skeleton` - Content placeholder with pulse and wave animations
- `Tooltip` - Contextual information on hover

### Data Display
- `Badge` - Status indicators and labels
- `Avatar` - User images with fallback
- `Card` - Content containers
- `Accordion` - Collapsible content sections
- `Tabs` - Tabbed navigation
- `Table` - Data tables

## Theming

Enable dark mode by adding `data-theme="dark"` to a parent element:

```tsx
<div data-theme="dark">
  {/* Components will use dark theme */}
</div>
```

## CSS Tokens

Import design tokens for custom styling:

```css
@import 'stoked-ds/dist/tokens/index.css';
```

Available tokens:
- Colors: `--stoked-color-*`
- Spacing: `--stoked-spacing-*`
- Typography: `--stoked-text-*`, `--stoked-font-*`
- Borders: `--stoked-radius-*`
- Shadows: `--stoked-shadow-*`

## Requirements

- React >= 18.0.0
- React DOM >= 18.0.0

## License

MIT © Pablo Cabrol
