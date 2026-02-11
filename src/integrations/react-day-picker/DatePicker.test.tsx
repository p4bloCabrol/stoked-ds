import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';

describe('DatePicker', () => {
  it('renders with label', () => {
    render(<DatePicker label="Birth date" />);

    expect(screen.getByText('Birth date')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(<DatePicker placeholder="Pick a date" />);

    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('opens calendar popup on click', async () => {
    const user = userEvent.setup();

    render(<DatePicker label="Date" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes popup on Escape', async () => {
    const user = userEvent.setup();

    render(<DatePicker label="Date" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays selected date', () => {
    const date = new Date(2025, 5, 15); // June 15, 2025

    render(<DatePicker value={date} />);

    expect(screen.getByText('Jun 15, 2025')).toBeInTheDocument();
  });

  it('calls onValueChange when a date is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<DatePicker onValueChange={onChange} />);

    await user.click(screen.getByRole('button'));

    // Click on day 15 in the calendar
    const day15 = screen.getByRole('gridcell', { name: '15' });
    const dayButton = day15.querySelector('button');
    if (dayButton) {
      await user.click(dayButton);
    }

    expect(onChange).toHaveBeenCalled();
    const calledDate = onChange.mock.calls[0][0];
    expect(calledDate).toBeInstanceOf(Date);
    expect(calledDate.getDate()).toBe(15);
  });

  it('shows error message', () => {
    render(<DatePicker error="Date is required" />);

    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<DatePicker helperText="Select your birth date" />);

    expect(screen.getByText('Select your birth date')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();

    render(<DatePicker disabled />);

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('uses custom formatDate', () => {
    const date = new Date(2025, 0, 1);

    render(
      <DatePicker
        value={date}
        formatDate={(d) => d.toISOString().split('T')[0]}
      />
    );

    expect(screen.getByText('2025-01-01')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<DatePicker label="Date" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('closes popup when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <DatePicker label="Date" />
        <button>Outside</button>
      </div>
    );

    await user.click(screen.getByRole('button', { name: /date/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByText('Outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('DateRangePicker', () => {
  it('renders with label', () => {
    render(<DateRangePicker label="Travel dates" />);

    expect(screen.getByText('Travel dates')).toBeInTheDocument();
  });

  it('shows placeholder when no range selected', () => {
    render(<DateRangePicker placeholder="Select dates" />);

    expect(screen.getByText('Select dates')).toBeInTheDocument();
  });

  it('opens calendar popup on click', async () => {
    const user = userEvent.setup();

    render(<DateRangePicker label="Dates" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays selected range', () => {
    const range = {
      from: new Date(2025, 5, 10),
      to: new Date(2025, 5, 20),
    };

    render(<DateRangePicker value={range} />);

    expect(screen.getByText(/Jun 10, 2025/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 20, 2025/)).toBeInTheDocument();
  });

  it('shows only from date when to is not yet selected', () => {
    const range = {
      from: new Date(2025, 5, 10),
      to: undefined,
    };

    render(<DateRangePicker value={range} />);

    expect(screen.getByText('Jun 10, 2025')).toBeInTheDocument();
  });
});
