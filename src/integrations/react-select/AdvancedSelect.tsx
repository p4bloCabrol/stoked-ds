import { useMemo } from 'react';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import type { GroupBase, StylesConfig } from 'react-select';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import type { AdvancedSelectProps } from './AdvancedSelect.types';
import styles from './AdvancedSelect.module.css';

function getStokedStyles<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  size: 'sm' | 'md' | 'lg',
  hasError: boolean
): StylesConfig<Option, IsMulti, Group> {
  const heightMap = { sm: 32, md: 40, lg: 48 };
  const fontSizeMap = { sm: '0.875rem', md: '1rem', lg: '1.125rem' };
  const optionPaddingMap = { sm: '6px 10px', md: '8px 12px', lg: '10px 16px' };

  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'var(--stoked-color-surface)',
      borderColor: hasError
        ? 'var(--stoked-color-danger)'
        : state.isFocused
          ? 'var(--stoked-color-primary)'
          : 'var(--stoked-color-border)',
      borderRadius: 'var(--stoked-radius-lg)',
      boxShadow: state.isFocused
        ? hasError
          ? '0 0 0 2px var(--stoked-color-danger-light)'
          : '0 0 0 2px var(--stoked-color-primary-light)'
        : 'none',
      minHeight: heightMap[size],
      fontSize: fontSizeMap[size],
      '&:hover': {
        borderColor: hasError
          ? 'var(--stoked-color-danger)'
          : state.isFocused
            ? 'var(--stoked-color-primary)'
            : 'var(--stoked-color-border-strong)',
      },
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
      cursor: state.isDisabled ? 'not-allowed' : 'default',
      opacity: state.isDisabled ? 0.5 : 1,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--stoked-color-surface)',
      border: '1px solid var(--stoked-color-border)',
      borderRadius: 'var(--stoked-radius-lg)',
      boxShadow: 'var(--stoked-shadow-lg)',
      zIndex: 1000,
      overflow: 'hidden',
    }),
    menuList: (base) => ({
      ...base,
      padding: '4px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'var(--stoked-color-primary)'
        : state.isFocused
          ? 'var(--stoked-color-surface-raised)'
          : 'transparent',
      color: state.isSelected ? 'var(--stoked-color-text-inverse)' : 'var(--stoked-color-text)',
      borderRadius: 'var(--stoked-radius-md)',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      opacity: state.isDisabled ? 0.5 : 1,
      fontSize: fontSizeMap[size],
      padding: optionPaddingMap[size],
      '&:active': {
        backgroundColor: state.isSelected
          ? 'var(--stoked-color-primary)'
          : 'var(--stoked-color-primary-light)',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--stoked-color-text)',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--stoked-color-primary-light)',
      borderRadius: 'var(--stoked-radius-md)',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--stoked-color-text)',
      fontSize: '0.875rem',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'var(--stoked-color-text-secondary)',
      borderRadius: '0 var(--stoked-radius-md) var(--stoked-radius-md) 0',
      '&:hover': {
        backgroundColor: 'var(--stoked-color-danger)',
        color: 'var(--stoked-color-text-inverse)',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--stoked-color-text-muted)',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--stoked-color-text)',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--stoked-color-text-secondary)',
      '&:hover': {
        color: 'var(--stoked-color-text)',
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: 'var(--stoked-color-text-secondary)',
      '&:hover': {
        color: 'var(--stoked-color-danger)',
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: 'var(--stoked-color-border)',
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: 'var(--stoked-color-text-muted)',
    }),
    groupHeading: (base) => ({
      ...base,
      color: 'var(--stoked-color-text-secondary)',
      fontWeight: 600,
      fontSize: '0.75rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: size === 'sm' ? '0 6px' : size === 'lg' ? '0 14px' : '0 10px',
    }),
  };
}

function AdvancedSelect<
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  error,
  helperText,
  size = 'md',
  fullWidth = false,
  required = false,
  isCreatable = false,
  isDisabled = false,
  className,
  ...selectProps
}: AdvancedSelectProps<Option, IsMulti, Group>) {
  const id = useId('advancedselect');
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const hasError = Boolean(error);

  const stokedStyles = useMemo(
    () => getStokedStyles<Option, IsMulti, Group>(size, hasError),
    [size, hasError]
  );

  const describedBy =
    [hasError ? errorId : null, helperText && !hasError ? helperId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  const commonProps = {
    ...selectProps,
    inputId: `${id}-input`,
    classNamePrefix: 'stoked-select' as const,
    styles: stokedStyles,
    isDisabled,
    'aria-invalid': hasError || undefined,
    'aria-required': required || undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div
      className={cn(styles.wrapper, className)}
      data-size={size}
      data-error={hasError || undefined}
      data-disabled={isDisabled || undefined}
      data-full-width={fullWidth || undefined}
    >
      {label && (
        <label htmlFor={`${id}-input`} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {isCreatable ? (
        <CreatableSelect<Option, IsMulti, Group> {...commonProps} />
      ) : (
        <ReactSelect<Option, IsMulti, Group> {...commonProps} />
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

AdvancedSelect.displayName = 'AdvancedSelect';
export { AdvancedSelect };
