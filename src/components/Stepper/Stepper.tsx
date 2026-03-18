import { forwardRef, useCallback, useMemo, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import type { StepperProps, StepStatus } from './Stepper.types';
import styles from './Stepper.module.css';

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep = 0,
      orientation = 'horizontal',
      size = 'md',
      onChange,
      clickable = false,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    // Compute status for each step
    const resolvedSteps = useMemo(
      () =>
        steps.map((step, index) => ({
          ...step,
          status: step.status ?? getAutoStatus(index, activeStep),
        })),
      [steps, activeStep]
    );

    // Progress percentage for the fill line
    const progressPercent = useMemo(() => {
      if (steps.length <= 1) return 0;
      return (activeStep / (steps.length - 1)) * 100;
    }, [activeStep, steps.length]);

    const handleStepClick = useCallback(
      (index: number) => {
        if (!clickable) return;
        onChange?.(index);
      },
      [clickable, onChange]
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStepClick(index);
        }
      },
      [handleStepClick]
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel || 'Progress steps'}
        className={cn(styles.root, className)}
        data-orientation={orientation}
        data-size={size}
        {...rest}
      >
        {/* Progress track */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={
              orientation === 'horizontal'
                ? { width: `${progressPercent}%` }
                : { height: `${progressPercent}%` }
            }
          />
        </div>

        {/* Steps */}
        {resolvedSteps.map((step, index) => (
            <div
              key={step.id}
              className={styles.step}
              data-status={step.status}
              data-clickable={clickable || undefined}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-current={step.status === 'active' ? 'step' : undefined}
              onClick={() => handleStepClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {/* Indicator circle */}
              <div className={styles.indicator}>
                {step.icon ? (
                  step.icon
                ) : step.status === 'completed' ? (
                  <CheckIcon />
                ) : step.status === 'error' ? (
                  <ErrorIcon />
                ) : (
                  <span>{String(index + 1).padStart(2, '0')}</span>
                )}
              </div>

              {/* Label & Description */}
              <div className={styles.content}>
                <span className={styles.stepLabel}>{step.label}</span>
                {step.description && (
                  <span className={styles.description}>
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
export { Stepper };

// =============================================================================
// Helpers
// =============================================================================

function getAutoStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
}
