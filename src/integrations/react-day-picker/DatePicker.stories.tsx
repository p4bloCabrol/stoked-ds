import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';

const meta = {
  title: 'Integrations/react-day-picker/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Date picker powered by react-day-picker, styled with stoked-ds design tokens. Supports controlled/uncontrolled state, min/max dates, error/helper text, and custom formatting.',
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
  },
};

export const WithValue: Story = {
  name: 'With Value',
  args: {
    label: 'Selected Date',
    value: new Date(2025, 5, 15),
  },
};

export const WithError: Story = {
  name: 'With Error',
  args: {
    label: 'Date of birth',
    error: 'This field is required',
    required: true,
  },
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    label: 'Start date',
    helperText: 'Choose the project start date',
  },
};

export const MinMaxDates: Story = {
  name: 'Min/Max Dates',
  render: function MinMaxStory() {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

    return (
      <DatePicker
        label="Future date"
        helperText="Select a date within the next year"
        value={date}
        onValueChange={setDate}
        minDate={today}
        maxDate={oneYearFromNow}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: new Date(2025, 0, 1),
    disabled: true,
  },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const date = new Date(2025, 5, 15);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 300 }}>
        <DatePicker label="Small" size="sm" value={date} />
        <DatePicker label="Medium (default)" size="md" value={date} />
        <DatePicker label="Large" size="lg" value={date} />
      </div>
    );
  },
};

export const CustomFormat: Story = {
  name: 'Custom Format',
  args: {
    label: 'ISO Format',
    value: new Date(2025, 5, 15),
    formatDate: (d: Date) => d.toISOString().split('T')[0],
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 15));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 300 }}>
        <DatePicker
          label="Controlled date"
          value={date}
          onValueChange={setDate}
        />
        <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
          Selected: {date ? date.toLocaleDateString() : 'none'}
        </p>
        <button
          onClick={() => setDate(undefined)}
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

export const DateRange: Story = {
  name: 'Date Range Picker',
  render: function DateRangeStory() {
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <div style={{ maxWidth: 500 }}>
        <DateRangePicker
          label="Travel dates"
          helperText="Select your check-in and check-out dates"
          value={range}
          onValueChange={setRange}
          minDate={new Date()}
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    label: 'Full width date picker',
    fullWidth: true,
    placeholder: 'Select a date',
  },
};
