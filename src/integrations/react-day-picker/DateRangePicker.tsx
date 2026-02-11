import { useState, useRef, useEffect, useCallback } from 'react';
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker';
import 'react-day-picker/style.css';
import { cn } from '../../utils/cn';
import { useControllable } from '../../utils/useControllable';
import { useId } from '../../utils/useId';
import type { DateRangePickerProps } from './DatePicker.types';
import { CalendarIcon, defaultFormatDate } from './shared';
import styles from './DatePicker.module.css';

function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  label,
  error,
  helperText,
  placeholder = 'Select a date range',
  size = 'md',
  minDate,
  maxDate,
  disabled = false,
  required = false,
  fullWidth = false,
  formatDate = defaultFormatDate,
  separator = ' — ',
  className,
}: DateRangePickerProps) {
  const [selected, setSelected] = useControllable<DateRange | undefined>(
    value,
    defaultValue,
    onValueChange
  );
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId('daterangepicker');
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const hasError = Boolean(error);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (range: DateRange | undefined) => {
      setSelected(range ?? undefined);
      // Close only when both dates are selected
      if (range?.from && range?.to) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    },
    [setSelected]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const disabledMatchers: Matcher[] = [];
  if (minDate) disabledMatchers.push({ before: minDate });
  if (maxDate) disabledMatchers.push({ after: maxDate });

  const displayText = selected?.from
    ? selected.to
      ? `${formatDate(selected.from)}${separator}${formatDate(selected.to)}`
      : formatDate(selected.from)
    : null;

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.wrapper, className)}
      data-size={size}
      data-error={hasError || undefined}
      data-disabled={disabled || undefined}
      data-full-width={fullWidth || undefined}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-invalid={hasError || undefined}
        aria-describedby={
          [hasError ? errorId : null, helperText && !hasError ? helperId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
      >
        <CalendarIcon />
        <span className={styles.triggerText}>
          {displayText || (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>
      </button>

      {isOpen && (
        <div className={styles.popup} role="dialog" aria-label="Choose date range">
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            disabled={disabledMatchers.length > 0 ? disabledMatchers : undefined}
            defaultMonth={selected?.from || minDate}
            numberOfMonths={2}
          />
        </div>
      )}

      {helperText && !hasError && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}
      {hasError && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

DateRangePicker.displayName = 'DateRangePicker';
export { DateRangePicker };
