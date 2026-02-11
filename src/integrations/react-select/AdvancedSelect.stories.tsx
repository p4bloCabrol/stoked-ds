import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AdvancedSelect } from './AdvancedSelect';

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragon Fruit', value: 'dragon-fruit' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

const meta = {
  title: 'Integrations/react-select/AdvancedSelect',
  component: AdvancedSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Advanced select powered by react-select, styled with stoked-ds design tokens. Supports single/multi select, search, creatable options, grouped options, and all standard form field features.',
      },
    },
  },
} satisfies Meta<typeof AdvancedSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit...',
    options: fruitOptions,
  },
};

export const WithValue: Story = {
  name: 'With Value',
  args: {
    label: 'Selected Fruit',
    options: fruitOptions,
    defaultValue: fruitOptions[2],
  },
};

export const MultiSelect: Story = {
  name: 'Multi Select',
  args: {
    label: 'Favorite fruits',
    placeholder: 'Select multiple...',
    options: fruitOptions,
    isMulti: true,
  },
};

export const Searchable: Story = {
  args: {
    label: 'Search & Select',
    placeholder: 'Type to search...',
    options: fruitOptions,
    isSearchable: true,
  },
};

export const Creatable: Story = {
  name: 'Creatable',
  args: {
    label: 'Tags',
    placeholder: 'Select or create...',
    options: fruitOptions,
    isCreatable: true,
    isMulti: true,
  },
};

export const Grouped: Story = {
  args: {
    label: 'Food',
    placeholder: 'Select from groups...',
    options: groupedOptions,
  },
};

export const WithError: Story = {
  name: 'With Error',
  args: {
    label: 'Required field',
    placeholder: 'Select a fruit...',
    options: fruitOptions,
    error: 'This field is required',
    required: true,
  },
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit...',
    options: fruitOptions,
    helperText: 'Choose your favorite fruit from the list',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    options: fruitOptions,
    defaultValue: fruitOptions[0],
    isDisabled: true,
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable',
    options: fruitOptions,
    defaultValue: fruitOptions[0],
    isClearable: true,
  },
};

export const Sizes: Story = {
  render: function SizesStory() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
        <AdvancedSelect
          label="Small"
          size="sm"
          options={fruitOptions}
          defaultValue={fruitOptions[0]}
        />
        <AdvancedSelect
          label="Medium (default)"
          size="md"
          options={fruitOptions}
          defaultValue={fruitOptions[1]}
        />
        <AdvancedSelect
          label="Large"
          size="lg"
          options={fruitOptions}
          defaultValue={fruitOptions[2]}
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    label: 'Full width select',
    fullWidth: true,
    placeholder: 'Select a fruit...',
    options: fruitOptions,
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState<{ label: string; value: string } | null>(fruitOptions[0]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <AdvancedSelect
          label="Controlled select"
          options={fruitOptions}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          isClearable
        />
        <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
          Selected: {value ? value.label : 'none'}
        </p>
        <button
          onClick={() => setValue(null)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid var(--stoked-color-border)',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
    );
  },
};
