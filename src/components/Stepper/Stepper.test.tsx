import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Stepper } from './Stepper';
import type { StepItem } from './Stepper.types';

const sampleSteps: StepItem[] = [
  { id: 'step-1', label: 'Step 1', description: 'First step' },
  { id: 'step-2', label: 'Step 2', description: 'Second step' },
  { id: 'step-3', label: 'Step 3', description: 'Third step' },
  { id: 'step-4', label: 'Step 4', description: 'Fourth step' },
];

describe('Stepper', () => {
  // ===========================================================================
  // Rendering
  // ===========================================================================

  it('should render all steps', () => {
    render(<Stepper steps={sampleSteps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
  });

  it('should render step descriptions', () => {
    render(<Stepper steps={sampleSteps} />);
    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step')).toBeInTheDocument();
  });

  it('should apply size data attribute', () => {
    const { container } = render(<Stepper steps={sampleSteps} size="lg" />);
    expect(container.firstChild).toHaveAttribute('data-size', 'lg');
  });

  it('should apply orientation data attribute', () => {
    const { container } = render(
      <Stepper steps={sampleSteps} orientation="vertical" />
    );
    expect(container.firstChild).toHaveAttribute(
      'data-orientation',
      'vertical'
    );
  });

  it('should accept className', () => {
    const { container } = render(
      <Stepper steps={sampleSteps} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  // ===========================================================================
  // Step Status
  // ===========================================================================

  it('should auto-calculate step statuses from activeStep', () => {
    const { container } = render(
      <Stepper steps={sampleSteps} activeStep={2} />
    );
    const steps = container.querySelectorAll('[data-status]');
    expect(steps[0]).toHaveAttribute('data-status', 'completed');
    expect(steps[1]).toHaveAttribute('data-status', 'completed');
    expect(steps[2]).toHaveAttribute('data-status', 'active');
    expect(steps[3]).toHaveAttribute('data-status', 'pending');
  });

  it('should default to first step active', () => {
    const { container } = render(<Stepper steps={sampleSteps} />);
    const steps = container.querySelectorAll('[data-status]');
    expect(steps[0]).toHaveAttribute('data-status', 'active');
    expect(steps[1]).toHaveAttribute('data-status', 'pending');
  });

  it('should respect explicit step status override', () => {
    const stepsWithError: StepItem[] = [
      { id: 's1', label: 'Upload' },
      { id: 's2', label: 'Validate', status: 'error' },
      { id: 's3', label: 'Deploy' },
    ];
    const { container } = render(
      <Stepper steps={stepsWithError} activeStep={1} />
    );
    const steps = container.querySelectorAll('[data-status]');
    expect(steps[1]).toHaveAttribute('data-status', 'error');
  });

  it('should show check icon for completed steps', () => {
    render(<Stepper steps={sampleSteps} activeStep={2} />);
    // Completed steps should have SVG check icons (polyline)
    const svgs = document.querySelectorAll('polyline[points="20 6 9 17 4 12"]');
    expect(svgs.length).toBe(2); // step-1 and step-2
  });

  it('should show step number for active and pending steps', () => {
    render(<Stepper steps={sampleSteps} activeStep={2} />);
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  // ===========================================================================
  // Clickable
  // ===========================================================================

  it('should call onChange when clicking a completed step', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Stepper
        steps={sampleSteps}
        activeStep={2}
        clickable
        onChange={onChange}
      />
    );

    await user.click(screen.getByText('Step 1'));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('should call onChange when clicking active step', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Stepper
        steps={sampleSteps}
        activeStep={2}
        clickable
        onChange={onChange}
      />
    );

    await user.click(screen.getByText('Step 3'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should call onChange when clicking a pending step', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Stepper
        steps={sampleSteps}
        activeStep={2}
        clickable
        onChange={onChange}
      />
    );

    await user.click(screen.getByText('Step 4'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('should not call onChange when not clickable', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Stepper
        steps={sampleSteps}
        activeStep={2}
        clickable={false}
        onChange={onChange}
      />
    );

    await user.click(screen.getByText('Step 1'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ===========================================================================
  // Keyboard
  // ===========================================================================

  it('should handle Enter key on clickable completed step', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Stepper
        steps={sampleSteps}
        activeStep={2}
        clickable
        onChange={onChange}
      />
    );

    const completedStep = screen.getByText('Step 1').closest('[data-status]')!;
    completedStep.focus();
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  // ===========================================================================
  // Accessibility
  // ===========================================================================

  it('should have group role', () => {
    render(<Stepper steps={sampleSteps} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('should have aria-label', () => {
    render(<Stepper steps={sampleSteps} aria-label="Checkout progress" />);
    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-label',
      'Checkout progress'
    );
  });

  it('should mark active step with aria-current', () => {
    const { container } = render(
      <Stepper steps={sampleSteps} activeStep={1} />
    );
    const steps = container.querySelectorAll('[data-status]');
    expect(steps[1]).toHaveAttribute('aria-current', 'step');
    expect(steps[0]).not.toHaveAttribute('aria-current');
  });

  it('should set role=button on all clickable steps', () => {
    const { container } = render(
      <Stepper steps={sampleSteps} activeStep={2} clickable />
    );
    const steps = container.querySelectorAll('[data-status]');
    expect(steps[0]).toHaveAttribute('role', 'button');
    expect(steps[1]).toHaveAttribute('role', 'button');
    expect(steps[2]).toHaveAttribute('role', 'button');
    expect(steps[3]).toHaveAttribute('role', 'button');
  });
});
