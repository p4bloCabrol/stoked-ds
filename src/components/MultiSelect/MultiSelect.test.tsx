import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MultiSelect } from './MultiSelect';
import type { MultiSelectOption } from './MultiSelect.types';

const sampleOptions: MultiSelectOption[] = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' },
  { value: 'delta', label: 'Delta', disabled: true },
];

describe('MultiSelect', () => {
  // ===========================================================================
  // Rendering
  // ===========================================================================

  it('should render with default props', () => {
    render(<MultiSelect options={sampleOptions} aria-label="Test" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should render placeholder', () => {
    render(
      <MultiSelect
        options={sampleOptions}
        placeholder="Pick items..."
        searchable={false}
        aria-label="Test"
      />
    );
    expect(screen.getByText('Pick items...')).toBeInTheDocument();
  });

  it('should render label', () => {
    render(<MultiSelect options={sampleOptions} label="Databases" />);
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });

  it('should render helper text', () => {
    render(
      <MultiSelect
        options={sampleOptions}
        helperText="Select one or more"
        aria-label="Test"
      />
    );
    expect(screen.getByText('Select one or more')).toBeInTheDocument();
  });

  it('should render error text instead of helper', () => {
    render(
      <MultiSelect
        options={sampleOptions}
        helperText="Select one or more"
        error="Required field"
        aria-label="Test"
      />
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.queryByText('Select one or more')).not.toBeInTheDocument();
  });

  it('should apply size data attribute', () => {
    const { container } = render(
      <MultiSelect options={sampleOptions} size="lg" aria-label="Test" />
    );
    expect(container.firstChild).toHaveAttribute('data-size', 'lg');
  });

  it('should accept className', () => {
    const { container } = render(
      <MultiSelect
        options={sampleOptions}
        className="custom"
        aria-label="Test"
      />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  // ===========================================================================
  // Open / Close
  // ===========================================================================

  it('should open dropdown on click', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} aria-label="Test" />);
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('should close dropdown on Escape', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} aria-label="Test" />);
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <MultiSelect options={sampleOptions} aria-label="Test" />
        <button>Outside</button>
      </div>
    );
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByText('Outside'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should show all options when open', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} aria-label="Test" />);

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    expect(screen.getByText('Delta')).toBeInTheDocument();
  });

  // ===========================================================================
  // Selection
  // ===========================================================================

  it('should select an option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith(['alpha']);
  });

  it('should select multiple options', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Alpha'));
    await user.click(screen.getByText('Beta'));
    expect(onChange).toHaveBeenLastCalledWith(['alpha', 'beta']);
  });

  it('should deselect on second click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={['alpha']}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    // Click on the option in the dropdown (not the chip)
    const option = screen.getByRole('option', { name: /Alpha/ });
    await user.click(option);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('should show chips for selected items', () => {
    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={['alpha', 'beta']}
        aria-label="Test"
      />
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('should remove chip on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={['alpha', 'beta']}
        onChange={onChange}
        aria-label="Test"
      />
    );

    const removeBtn = screen.getByRole('button', { name: 'Remove Alpha' });
    await user.click(removeBtn);
    expect(onChange).toHaveBeenCalledWith(['beta']);
  });

  it('should not select disabled options', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Delta'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should respect max selection limit', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={['alpha', 'beta']}
        max={2}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Gamma'));
    // Should not add third item
    expect(onChange).not.toHaveBeenCalled();
  });

  // ===========================================================================
  // Search
  // ===========================================================================

  it('should filter options by search', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} searchable aria-label="Test" />);

    await user.click(screen.getByRole('combobox'));
    const input = screen.getByRole('textbox', { name: 'Search options' });
    await user.type(input, 'alp');

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('should show empty message when no results', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} searchable aria-label="Test" />);

    await user.click(screen.getByRole('combobox'));
    const input = screen.getByRole('textbox', { name: 'Search options' });
    await user.type(input, 'nonexistent xyz');

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should remove last chip with Backspace on empty input', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={['alpha', 'beta']}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    const input = screen.getByRole('textbox', { name: 'Search options' });
    await user.click(input);
    await user.keyboard('{Backspace}');
    expect(onChange).toHaveBeenCalledWith(['alpha']);
  });

  // ===========================================================================
  // Disabled
  // ===========================================================================

  it('should not open when disabled', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect options={sampleOptions} disabled aria-label="Test" />
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  // ===========================================================================
  // Keyboard Navigation
  // ===========================================================================

  it('should open on ArrowDown', async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect options={sampleOptions} searchable={false} aria-label="Test" />
    );
    screen.getByRole('combobox').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  // ===========================================================================
  // Accessibility
  // ===========================================================================

  it('should have correct ARIA attributes', () => {
    render(
      <MultiSelect options={sampleOptions} aria-label="Select databases" />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-label', 'Select databases');
  });

  it('should have listbox role on dropdown', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} aria-label="Test" />);

    await user.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('should have option roles in dropdown', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={sampleOptions} aria-label="Test" />);

    await user.click(screen.getByRole('combobox'));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
  });
});
