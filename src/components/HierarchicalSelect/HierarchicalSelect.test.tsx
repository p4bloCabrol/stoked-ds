import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HierarchicalSelect } from './HierarchicalSelect';
import type { HierarchicalOption } from './HierarchicalSelect.types';

const sampleOptions: HierarchicalOption[] = [
  {
    id: 'root-1',
    label: 'Root 1',
    children: [
      {
        id: 'child-1',
        label: 'Child 1',
        children: [
          { id: 'leaf-1', label: 'Leaf 1' },
          { id: 'leaf-2', label: 'Leaf 2' },
        ],
      },
      { id: 'child-2', label: 'Child 2' },
    ],
  },
  { id: 'root-2', label: 'Root 2' },
];

describe('HierarchicalSelect', () => {
  // =========================================================================
  // Rendering
  // =========================================================================

  it('should render with default props', () => {
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test select" />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should render placeholder text', () => {
    render(
      <HierarchicalSelect
        options={sampleOptions}
        placeholder="Pick one..."
        aria-label="Test"
      />
    );
    expect(screen.getByText('Pick one...')).toBeInTheDocument();
  });

  it('should render label', () => {
    render(
      <HierarchicalSelect options={sampleOptions} label="Location" />
    );
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('should apply size data attribute', () => {
    const { container } = render(
      <HierarchicalSelect
        options={sampleOptions}
        size="lg"
        aria-label="Test"
      />
    );
    expect(container.firstChild).toHaveAttribute('data-size', 'lg');
  });

  it('should accept className', () => {
    const { container } = render(
      <HierarchicalSelect
        options={sampleOptions}
        className="custom-class"
        aria-label="Test"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  // =========================================================================
  // Open / Close
  // =========================================================================

  it('should open dropdown on click', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('should close dropdown on Escape', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should show tree items when open', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Root 1')).toBeInTheDocument();
    expect(screen.getByText('Root 2')).toBeInTheDocument();
  });

  // =========================================================================
  // Single-Select
  // =========================================================================

  it('should select an item in single mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="single"
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Root 2'));
    expect(onChange).toHaveBeenCalledWith('root-2');
  });

  it('should close dropdown after single selection', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="single"
        aria-label="Test"
      />
    );
    const trigger = screen.getByRole('combobox');

    await user.click(trigger);
    await user.click(screen.getByText('Root 2'));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should display selected item path in trigger', async () => {
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="single"
        defaultValue="root-2"
        aria-label="Test"
      />
    );
    expect(screen.getByText('Root 2')).toBeInTheDocument();
  });

  // =========================================================================
  // Multi-Select
  // =========================================================================

  it('should show chips in multi mode', async () => {
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="multi"
        defaultValue={['root-2']}
        aria-label="Test"
      />
    );
    expect(screen.getByText('Root 2')).toBeInTheDocument();
  });

  it('should remove chip on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="multi"
        defaultValue={['root-2']}
        onChange={onChange}
        aria-label="Test"
      />
    );

    const removeBtn = screen.getByRole('button', { name: 'Remove Root 2' });
    await user.click(removeBtn);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('should show footer with clear and apply buttons when items selected', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="multi"
        defaultValue={['root-2']}
        showApplyButton
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Clear all')).toBeInTheDocument();
    expect(screen.getByText('Apply Selection')).toBeInTheDocument();
  });

  it('should disable apply button when no items selected', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="multi"
        showApplyButton
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Apply Selection')).toBeDisabled();
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
  });

  it('should call onApply when apply button is clicked', async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="multi"
        defaultValue={['root-2']}
        showApplyButton
        onApply={onApply}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Apply Selection'));
    expect(onApply).toHaveBeenCalledWith(['root-2']);
  });

  it('should clear all selections', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <HierarchicalSelect
        options={sampleOptions}
        mode="multi"
        defaultValue={['root-2']}
        onChange={onChange}
        aria-label="Test"
      />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Clear all'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  // =========================================================================
  // Tree Expand / Collapse
  // =========================================================================

  it('should expand tree nodes on click', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Child 1')).not.toBeInTheDocument();

    await user.click(screen.getByText('Root 1'));
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should expand nested nodes', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Root 1'));
    await user.click(screen.getByText('Child 1'));
    expect(screen.getByText('Leaf 1')).toBeInTheDocument();
    expect(screen.getByText('Leaf 2')).toBeInTheDocument();
  });

  // =========================================================================
  // Search
  // =========================================================================

  it('should filter options by search in single mode', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} searchable aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'Root 2');
    expect(screen.getByText('Root 2')).toBeInTheDocument();
    expect(screen.queryByText('Root 1')).not.toBeInTheDocument();
  });

  it('should show empty message when no results', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} searchable aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'nonexistent item xyz');
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  // =========================================================================
  // Disabled
  // =========================================================================

  it('should not open when disabled', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} disabled aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  // =========================================================================
  // Keyboard Navigation
  // =========================================================================

  it('should open on Enter key', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    screen.getByRole('combobox').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('should open on ArrowDown key', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    screen.getByRole('combobox').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  // =========================================================================
  // Accessibility
  // =========================================================================

  it('should have correct ARIA attributes on trigger', () => {
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Select location" />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-haspopup', 'tree');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-label', 'Select location');
  });

  it('should have tree role on dropdown list', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('should have treeitem role on options', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    const items = screen.getAllByRole('treeitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should set aria-multiselectable in multi mode', async () => {
    const user = userEvent.setup();
    render(
      <HierarchicalSelect options={sampleOptions} mode="multi" aria-label="Test" />
    );

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('tree')).toHaveAttribute(
      'aria-multiselectable',
      'true'
    );
  });
});
