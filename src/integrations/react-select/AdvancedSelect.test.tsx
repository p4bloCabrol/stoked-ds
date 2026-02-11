import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AdvancedSelect } from './AdvancedSelect';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('AdvancedSelect', () => {
  it('renders label', () => {
    render(<AdvancedSelect label="Fruit" options={options} />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    render(<AdvancedSelect placeholder="Choose a fruit" options={options} />);
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
  });

  it('opens menu and selects an option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AdvancedSelect options={options} onChange={onChange} />);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const option = screen.getByText('Apple');
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(
      { label: 'Apple', value: 'apple' },
      expect.any(Object)
    );
  });

  it('displays error message', () => {
    render(<AdvancedSelect label="Fruit" error="Required" options={options} />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <AdvancedSelect label="Fruit" helperText="Pick one" options={options} />
    );
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('hides helper text when error is shown', () => {
    render(
      <AdvancedSelect
        label="Fruit"
        helperText="Pick one"
        error="Required"
        options={options}
      />
    );
    expect(screen.queryByText('Pick one')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(<AdvancedSelect label="Fruit" required options={options} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    const { container } = render(
      <AdvancedSelect label="Fruit" isDisabled options={options} />
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute('data-disabled');
  });

  it('supports multi-select', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AdvancedSelect options={options} isMulti onChange={onChange} />);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    await user.click(screen.getByText('Apple'));

    expect(onChange).toHaveBeenCalledWith(
      [{ label: 'Apple', value: 'apple' }],
      expect.any(Object)
    );
  });

  it('filters options when searching', async () => {
    const user = userEvent.setup();
    render(<AdvancedSelect options={options} isSearchable />);

    const combobox = screen.getByRole('combobox');
    await user.type(combobox, 'Ban');

    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(
      <AdvancedSelect options={options} defaultValue={options[1]} />
    );
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('renders creatable select', async () => {
    const user = userEvent.setup();
    render(<AdvancedSelect options={options} isCreatable />);

    const combobox = screen.getByRole('combobox');
    await user.type(combobox, 'Mango');

    expect(screen.getByText(/Create "Mango"/)).toBeInTheDocument();
  });

  it('renders full width', () => {
    const { container } = render(
      <AdvancedSelect label="Fruit" fullWidth options={options} />
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute('data-full-width');
  });
});
