import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import { useControllable } from '../../utils/useControllable';
import { mergeRefs } from '../../utils/mergeRefs';
import type { MultiSelectProps } from './MultiSelect.types';
import styles from './MultiSelect.module.css';

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = [],
      onChange,
      size = 'md',
      placeholder = 'Select...',
      searchable = true,
      searchPlaceholder = 'Add...',
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      label,
      helperText,
      error,
      max,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const baseId = useId('multiselect');
    const triggerId = `${baseId}-trigger`;
    const listboxId = `${baseId}-listbox`;
    const labelId = label ? `${baseId}-label` : undefined;

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // State
    const [isOpen, setIsOpen] = useControllable(
      controlledOpen,
      defaultOpen,
      onOpenChange
    );

    const [selectedValues, setSelectedValues] = useControllable<string[]>(
      controlledValue,
      defaultValue,
      onChange
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    // Selected set for fast lookups
    const selectedSet = useMemo(
      () => new Set(selectedValues),
      [selectedValues]
    );

    // Option map for O(1) lookups
    const optionMap = useMemo(
      () => new Map(options.map((o) => [o.value, o])),
      [options]
    );

    // Filtered options
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      const lower = searchQuery.toLowerCase();
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(lower)
      );
    }, [options, searchQuery]);

    // Handlers
    const toggleOpen = useCallback(() => {
      if (disabled) return;
      setIsOpen(!isOpen);
    }, [disabled, isOpen, setIsOpen]);

    const handleSelect = useCallback(
      (value: string) => {
        const option = optionMap.get(value);
        if (option?.disabled) return;

        if (selectedSet.has(value)) {
          setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
          if (max !== undefined && selectedValues.length >= max) return;
          setSelectedValues([...selectedValues, value]);
        }
      },
      [optionMap, selectedSet, selectedValues, setSelectedValues, max]
    );

    const handleRemoveChip = useCallback(
      (value: string, e: MouseEvent) => {
        e.stopPropagation();
        setSelectedValues(selectedValues.filter((v) => v !== value));
      },
      [selectedValues, setSelectedValues]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setActiveIndex(0);
            } else {
              setActiveIndex((prev) =>
                Math.min(prev + 1, filteredOptions.length - 1)
              );
            }
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            if (isOpen) {
              setActiveIndex((prev) => Math.max(prev - 1, 0));
            }
            break;
          }
          case 'Enter':
          case ' ': {
            if (!isOpen) {
              e.preventDefault();
              setIsOpen(true);
              setActiveIndex(0);
            } else if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
              // Only prevent default for Space when not in the search input
              const target = e.target as HTMLElement;
              if (e.key === ' ' && target.tagName === 'INPUT') return;
              e.preventDefault();
              handleSelect(filteredOptions[activeIndex].value);
            }
            break;
          }
          case 'Escape': {
            e.preventDefault();
            setIsOpen(false);
            break;
          }
          case 'Backspace': {
            const target = e.target as HTMLInputElement;
            if (target.tagName === 'INPUT' && target.value === '' && selectedValues.length > 0) {
              setSelectedValues(selectedValues.slice(0, -1));
            }
            break;
          }
          case 'Home': {
            if (isOpen) {
              e.preventDefault();
              setActiveIndex(0);
            }
            break;
          }
          case 'End': {
            if (isOpen) {
              e.preventDefault();
              setActiveIndex(filteredOptions.length - 1);
            }
            break;
          }
        }
      },
      [
        disabled,
        isOpen,
        activeIndex,
        filteredOptions,
        selectedValues,
        setIsOpen,
        setSelectedValues,
        handleSelect,
      ]
    );

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: globalThis.MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () =>
        document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, setIsOpen]);

    // Reset search and focus input when opening
    useEffect(() => {
      if (isOpen) {
        setSearchQuery('');
        setActiveIndex(-1);
      }
    }, [isOpen]);

    useEffect(() => {
      let rafId: number;
      if (isOpen && searchable) {
        rafId = requestAnimationFrame(() => {
          searchRef.current?.focus();
        });
      }
      return () => cancelAnimationFrame(rafId);
    }, [isOpen, searchable]);

    // Scroll active item into view
    useEffect(() => {
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        const el = document.getElementById(
          `${baseId}-option-${filteredOptions[activeIndex].value}`
        );
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [activeIndex, baseId, filteredOptions]);

    // Get label for a value
    const getLabel = useCallback(
      (value: string) => optionMap.get(value)?.label ?? value,
      [optionMap]
    );

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn(styles.root, className)}
        data-size={size}
        data-disabled={disabled || undefined}
        data-open={isOpen || undefined}
        data-error={error ? true : undefined}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {/* Label */}
        {label && (
          <label id={labelId} htmlFor={triggerId} className={styles.label}>
            {label}
          </label>
        )}

        {/* Trigger */}
        <div
          id={triggerId}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={labelId}
          aria-label={!label ? ariaLabel || placeholder : undefined}
          aria-disabled={disabled || undefined}
          aria-activedescendant={
            isOpen && activeIndex >= 0 && activeIndex < filteredOptions.length
              ? `${baseId}-option-${filteredOptions[activeIndex].value}`
              : undefined
          }
          tabIndex={disabled ? -1 : 0}
          className={styles.trigger}
          onClick={toggleOpen}
        >
          <div className={styles.triggerContent}>
            {/* Chips */}
            {selectedValues.map((value) => (
              <span key={value} className={styles.chip}>
                <span className={styles.chipLabel}>{getLabel(value)}</span>
                <button
                  type="button"
                  className={styles.chipRemove}
                  onClick={(e) => handleRemoveChip(value, e)}
                  aria-label={`Remove ${getLabel(value)}`}
                  tabIndex={-1}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}

            {/* Inline search / placeholder */}
            {searchable ? (
              <input
                ref={searchRef}
                type="text"
                className={styles.inlineSearch}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isOpen) setIsOpen(true);
                  setActiveIndex(0);
                }}
                placeholder={
                  selectedValues.length === 0 ? placeholder : searchPlaceholder
                }
                aria-label="Search options"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isOpen) setIsOpen(true);
                }}
              />
            ) : (
              selectedValues.length === 0 && (
                <span className={styles.placeholder}>{placeholder}</span>
              )
            )}
          </div>

          {/* Arrow */}
          <span className={styles.triggerArrow} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className={styles.dropdown} data-size={size}>
            <div
              id={listboxId}
              role="listbox"
              aria-label={ariaLabel || label || placeholder}
              aria-multiselectable="true"
              className={styles.list}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isSelected = selectedSet.has(option.value);
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={option.value}
                      id={`${baseId}-option-${option.value}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled || undefined}
                      className={styles.option}
                      data-selected={isSelected || undefined}
                      data-active={isActive || undefined}
                      data-disabled={option.disabled || undefined}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(option.value);
                      }}
                    >
                      <span
                        className={styles.checkbox}
                        aria-hidden="true"
                        data-checked={isSelected || undefined}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span className={styles.optionLabel}>{option.label}</span>
                    </div>
                  );
                })
              ) : (
                <div className={styles.empty}>No results found</div>
              )}
            </div>
          </div>
        )}

        {/* Helper / Error text */}
        {error ? (
          <span className={styles.errorText}>{error}</span>
        ) : helperText ? (
          <span className={styles.helperText}>{helperText}</span>
        ) : null}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
export { MultiSelect };
