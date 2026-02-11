# stoked-ds

A lightweight, accessible React design system with zero-runtime CSS.

## Features

- **27 Components** - Full set of form controls, feedback, data display, layout, and navigation components
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
import { Button, Input, Sidebar, AppShell } from 'stoked-ds';
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
- `SearchInput` - Input with built-in search icon and Enter-to-search
- `Select` - Dropdown selection
- `Checkbox` - Single or multiple selection
- `Radio` / `RadioGroup` - Single selection from options
- `Switch` - Toggle on/off
- `ButtonGroup` - Toggle group for mutually exclusive options

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
- `Tag` - Removable labels with color variants (solid/outline)
- `Avatar` - User images with fallback
- `Card` - Content containers
- `StatCard` - Metric card with icon, value, trend, and status
- `Accordion` - Collapsible content sections
- `Tabs` - Tabbed navigation
- `Table` - Data tables

### Layout
- `Sidebar` - Collapsible sidebar navigation with sections and items
- `AppShell` - Application layout wrapper (sidebar + header + content)

### Navigation
- `Breadcrumb` - Hierarchical navigation trail
- `Pagination` - Page navigation with smart ellipsis

## Integrations

stoked-ds provides optional adapters for popular third-party libraries. Import them from separate sub-paths — they won't affect your bundle if you don't use them.

### React Hook Form

```bash
npm install react-hook-form
```

```tsx
import { useForm } from 'react-hook-form';
import { Form, FormField } from 'stoked-ds/integrations/react-hook-form';
import { Input, Button } from 'stoked-ds';

function LoginForm() {
  const form = useForm({ defaultValues: { email: '', password: '' } });

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <FormField
        control={form.control}
        name="email"
        render={({ field, error }) => (
          <Input {...field} label="Email" error={error?.message} />
        )}
      />
      <Button type="submit">Sign In</Button>
    </Form>
  );
}
```

### TanStack Table

```bash
npm install @tanstack/react-table
```

```tsx
import { DataTable } from 'stoked-ds/integrations/tanstack-table';
import type { ColumnDef } from 'stoked-ds/integrations/tanstack-table';

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={users}
      enableSorting
      enablePagination
      pageSize={10}
      variant="striped"
    />
  );
}
```

### react-day-picker

```bash
npm install react-day-picker
```

```tsx
import { DatePicker, DateRangePicker } from 'stoked-ds/integrations/react-day-picker';

function BookingForm() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker
      label="Check-in date"
      value={date}
      onValueChange={setDate}
      minDate={new Date()}
      size="md"
    />
  );
}
```

### react-select

```bash
npm install react-select
```

```tsx
import { AdvancedSelect } from 'stoked-ds/integrations/react-select';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
];

function TechPicker() {
  return (
    <AdvancedSelect
      label="Technologies"
      options={options}
      isMulti
      isSearchable
      isClearable
      size="md"
    />
  );
}
```

### Recharts

```bash
npm install recharts
```

```tsx
import { ChartCard, StokedLineChart } from 'stoked-ds/integrations/recharts';

const data = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 5000, profit: 3800 },
];

function Dashboard() {
  return (
    <ChartCard title="Monthly Revenue">
      <StokedLineChart
        data={data}
        dataKeys={['revenue', 'profit']}
        xAxisKey="month"
        showLegend
      />
    </ChartCard>
  );
}
```

### Coming Soon

- **React Flow** — Styled nodes and controls for node-based UIs

## Storybook

Run `npm run dev` to launch Storybook with:

- All 27 component stories with controls and docs
- **8 Page stories** — Full-screen inventory management pages showing how components compose into real UIs (Dashboard, Inventory List, Inventory Detail, Warehouses, Stock Entry, Reports, Settings, Loading States)
- 5 Integration demos (React Hook Form, TanStack Table, react-day-picker, react-select, Recharts)

## Theming

Enable dark mode by adding `data-theme="dark"` to a parent element:

```tsx
<div data-theme="dark">
  {/* Components will use dark theme */}
</div>
```

Light mode:

```tsx
<div data-theme="light">
  {/* Components will use light theme */}
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
- Transitions: `--stoked-duration-*`, `--stoked-easing-*`

## Requirements

- React >= 18.0.0
- React DOM >= 18.0.0

## License

MIT © Pablo Cabrol
