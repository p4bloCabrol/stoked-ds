import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Form Controls/ButtonGroup',
  component: ButtonGroup,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const priorityOptions = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('medium');
    return <ButtonGroup options={priorityOptions} value={value} onChange={setValue} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('medium');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
        <ButtonGroup options={priorityOptions} value={value} onChange={setValue} size="sm" />
        <ButtonGroup options={priorityOptions} value={value} onChange={setValue} size="md" />
        <ButtonGroup options={priorityOptions} value={value} onChange={setValue} size="lg" />
      </div>
    );
  },
};

export const ViewToggle: Story = {
  render: () => {
    const [value, setValue] = useState('grid');
    return (
      <ButtonGroup
        options={[
          { label: 'Grid', value: 'grid' },
          { label: 'List', value: 'list' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
