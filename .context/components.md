# stoked-ds — Component Inventory

**Total: 32 components** (as of v0.5.0)

## Form Controls (9)

| Component | Description |
|-----------|-------------|
| Button | Solid / outline / ghost / link variants |
| Input | Text field with label, helper text, error |
| SearchInput | Input with search icon and onSearch (Enter) |
| Checkbox | Checkbox with indeterminate support |
| Radio / RadioGroup | Radio button with group |
| Select | Dropdown selector |
| HierarchicalSelect | Nested dropdown with parent/child levels (single/multi mode) |
| Switch | Toggle switch |
| ButtonGroup | Mutually exclusive toggle group |

## Feedback (7)

| Component | Description |
|-----------|-------------|
| Alert | Status messages (info / success / warning / danger) |
| Modal | Dialog with focus trap and exit animation |
| Toast / ToastProvider | Temporary notifications |
| Spinner | Circular loading indicator (CSS keyframes) |
| Progress | Progress bar with stripes and indeterminate mode |
| Skeleton | Loading placeholder with pulse/wave animations |
| Tooltip | Informational tooltip |

## Data Display (9)

| Component | Description |
|-----------|-------------|
| Badge | Labels / badges |
| Tag | Removable tags with solid/outline variants |
| Avatar | User avatars |
| Card | Container card |
| StatCard | Metric card with icon, value, trend, status |
| Accordion | Collapsible panels |
| Tabs | Tab navigation |
| Table | Data table |
| MultiSelect | Multi-select input with pill/chip tags |

## Layout (2)

| Component | Description |
|-----------|-------------|
| Sidebar | Collapsible side navigation with sections and items |
| AppShell | Layout wrapper (sidebar + header + content) |

## Navigation (2)

| Component | Description |
|-----------|-------------|
| Breadcrumb | Hierarchical navigation |
| Pagination | Page navigation with smart ellipsis |

## Stepper (1)

| Component | Description |
|-----------|-------------|
| Stepper | Step wizard with active/completed/error states, horizontal/vertical |

## Integrations (separate sub-path exports)

| Integration | Import | Components |
|-------------|--------|------------|
| React Hook Form | `stoked-ds/integrations/react-hook-form` | Form, FormField |
| TanStack Table | `stoked-ds/integrations/tanstack-table` | DataTable |
| react-day-picker | `stoked-ds/integrations/react-day-picker` | DatePicker, DateRangePicker |
| react-select | `stoked-ds/integrations/react-select` | AdvancedSelect |
| Recharts | `stoked-ds/integrations/recharts` | ChartCard, StokedLineChart, StokedBarChart, StokedAreaChart, StokedPieChart |
