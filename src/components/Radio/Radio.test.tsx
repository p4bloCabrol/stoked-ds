import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  it('should render with label', () => {
    render(<Radio value="test" label="Test option" name="test" />);
    expect(screen.getByLabelText('Test option')).toBeInTheDocument();
  });

  it('should render radio input', () => {
    render(<Radio value="test" label="Test" name="test" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should be selectable', async () => {
    const user = userEvent.setup();
    render(<Radio value="test" label="Test" name="test" />);
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();
    await user.click(radio);
    expect(radio).toBeChecked();
  });

  it('should be disabled', () => {
    render(<Radio value="test" label="Test" name="test" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('should render description', () => {
    render(<Radio value="test" label="Test" name="test" description="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Radio ref={ref} value="test" label="Test" name="test" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });
});

describe('RadioGroup', () => {
  it('should render radiogroup role', () => {
    render(
      <RadioGroup name="test">
        <Radio value="1" label="Option 1" />
        <Radio value="2" label="Option 2" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('should render all radio options', () => {
    render(
      <RadioGroup name="test">
        <Radio value="1" label="Option 1" />
        <Radio value="2" label="Option 2" />
        <Radio value="3" label="Option 3" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('should select default value', () => {
    render(
      <RadioGroup name="test" defaultValue="2">
        <Radio value="1" label="Option 1" />
        <Radio value="2" label="Option 2" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('should call onValueChange when selection changes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup name="test" onValueChange={onValueChange}>
        <Radio value="1" label="Option 1" />
        <Radio value="2" label="Option 2" />
      </RadioGroup>
    );
    await user.click(screen.getByLabelText('Option 2'));
    expect(onValueChange).toHaveBeenCalledWith('2');
  });

  it('should disable all radios when group is disabled', () => {
    render(
      <RadioGroup name="test" disabled>
        <Radio value="1" label="Option 1" />
        <Radio value="2" label="Option 2" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('should only allow one selection', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup name="test">
        <Radio value="1" label="Option 1" />
        <Radio value="2" label="Option 2" />
      </RadioGroup>
    );
    await user.click(screen.getByLabelText('Option 1'));
    expect(screen.getByLabelText('Option 1')).toBeChecked();
    await user.click(screen.getByLabelText('Option 2'));
    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });
});
