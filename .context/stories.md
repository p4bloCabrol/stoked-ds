# stoked-ds — Storybook Story Patterns

## Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',  // or 'Integrations/LibraryName/ComponentName'
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
      <ComponentName {...args} variant="ghost">Ghost</ComponentName>
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

## Rules

- `title: 'Components/ComponentName'` for components, `'Integrations/LibraryName/ComponentName'` for integrations
- Always use `satisfies Meta<typeof Component>` for type safety
- Always include `tags: ['autodocs']`
- Mandatory stories: **Default**, **Variants**, **Sizes**
- Add extra stories for key interactions (e.g., `Disabled`, `Loading`, `WithIcon`)
- Use `argTypes` with controls for all interactive props
- `inline styles` are allowed in story wrappers for layout — never in component implementation

## Commands

```bash
npm run dev   # Storybook on port 6006
```
