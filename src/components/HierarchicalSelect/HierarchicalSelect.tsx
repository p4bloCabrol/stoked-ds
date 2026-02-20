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
import type {
  HierarchicalSelectProps,
  HierarchicalOption,
} from './HierarchicalSelect.types';
import styles from './HierarchicalSelect.module.css';

// =============================================================================
// Helpers
// =============================================================================

function findOption(
  options: HierarchicalOption[],
  id: string
): HierarchicalOption | undefined {
  for (const opt of options) {
    if (opt.id === id) return opt;
    if (opt.children) {
      const found = findOption(opt.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

function getBreadcrumb(
  options: HierarchicalOption[],
  id: string,
  path: string[] = []
): string[] | null {
  for (const opt of options) {
    const currentPath = [...path, opt.label];
    if (opt.id === id) return currentPath;
    if (opt.children) {
      const found = getBreadcrumb(opt.children, id, currentPath);
      if (found) return found;
    }
  }
  return null;
}

function filterTree(
  options: HierarchicalOption[],
  query: string
): HierarchicalOption[] {
  const lower = query.toLowerCase();
  const result: HierarchicalOption[] = [];
  for (const opt of options) {
    const childMatches = opt.children
      ? filterTree(opt.children, query)
      : [];
    if (opt.label.toLowerCase().includes(lower) || childMatches.length > 0) {
      result.push({
        ...opt,
        children: childMatches.length > 0 ? childMatches : opt.children,
      });
    }
  }
  return result;
}

// =============================================================================
// TreeItem Sub-component
// =============================================================================

interface TreeItemProps {
  option: HierarchicalOption;
  depth: number;
  mode: 'single' | 'multi';
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  activeDescendant: string;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  options: HierarchicalOption[];
}

function TreeItem({
  option,
  depth,
  mode,
  selectedIds,
  expandedIds,
  activeDescendant,
  onSelect,
  onToggleExpand,
  options,
}: TreeItemProps) {
  const hasChildren = option.children && option.children.length > 0;
  const isExpanded = expandedIds.has(option.id);
  const isSelected = selectedIds.has(option.id);
  const isActive = activeDescendant === option.id;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (option.disabled) return;
    if (hasChildren) {
      onToggleExpand(option.id);
      // In single mode, clicking a parent only expands/collapses
      if (mode === 'single') return;
    }
    onSelect(option.id);
  };

  const breadcrumb =
    mode === 'multi' ? getBreadcrumb(options, option.id) : null;

  return (
    <>
      <div
        role="treeitem"
        id={`tree-item-${option.id}`}
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-disabled={option.disabled || undefined}
        aria-level={depth + 1}
        tabIndex={-1}
        className={cn(styles.item)}
        style={{ '--_hs-item-depth': depth } as React.CSSProperties}
        data-depth={depth}
        data-selected={isSelected || undefined}
        data-active={isActive || undefined}
        data-disabled={option.disabled || undefined}
        data-has-children={hasChildren || undefined}
        onClick={handleClick}
      >
        {/* Chevron / Indent */}
        {hasChildren ? (
          <span
            className={styles.chevron}
            data-expanded={isExpanded || undefined}
            aria-hidden="true"
          >
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        ) : (
          <span className={styles.leafIndent} aria-hidden="true" />
        )}

        {/* Icon */}
        {option.icon && (
          <span className={styles.itemIcon} aria-hidden="true">
            {option.icon}
          </span>
        )}

        {/* Content */}
        <div className={styles.itemContent}>
          <span className={styles.itemLabel}>{option.label}</span>
          {mode === 'multi' && breadcrumb && breadcrumb.length > 1 && (
            <span className={styles.itemPath}>
              {breadcrumb.map((segment, i) => (
                <span key={i}>
                  {i > 0 && (
                    <svg
                      className={styles.pathSeparator}
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                  {segment}
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Checkbox (multi mode) */}
        {mode === 'multi' && (
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
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div role="group">
          {option.children!.map((child) => (
            <TreeItem
              key={child.id}
              option={child}
              depth={depth + 1}
              mode={mode}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              activeDescendant={activeDescendant}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              options={options}
            />
          ))}
        </div>
      )}
    </>
  );
}

// =============================================================================
// HierarchicalSelect
// =============================================================================

const HierarchicalSelect = forwardRef<HTMLDivElement, HierarchicalSelectProps>(
  (
    {
      options,
      mode = 'single',
      size = 'md',
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select...',
      searchable = true,
      searchPlaceholder = 'Search...',
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      label,
      showApplyButton = false,
      applyButtonLabel = 'Apply Selection',
      clearButtonLabel = 'Clear all',
      onApply,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const baseId = useId('hierarchical-select');
    const triggerId = `${baseId}-trigger`;
    const listboxId = `${baseId}-listbox`;
    const labelId = label ? `${baseId}-label` : undefined;

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // State
    const [isOpen, setIsOpen] = useControllable(
      controlledOpen,
      defaultOpen,
      onOpenChange
    );

    const defaultVal = useMemo(() => {
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    }, [defaultValue]);

    const [selectedIds, setSelectedIds] = useControllable<string[]>(
      controlledValue !== undefined
        ? Array.isArray(controlledValue)
          ? controlledValue
          : [controlledValue]
        : undefined,
      defaultVal,
      (val) => {
        if (mode === 'single') {
          onChange?.(val[0] ?? '');
        } else {
          onChange?.(val);
        }
      }
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [activeDescendant, setActiveDescendant] = useState('');

    // Filtered options
    const displayOptions = useMemo(() => {
      if (!searchQuery) return options;
      return filterTree(options, searchQuery);
    }, [options, searchQuery]);

    // Visible flat items (respecting expanded state)
    const visibleItems = useMemo(() => {
      const result: HierarchicalOption[] = [];
      const walk = (nodes: HierarchicalOption[], depth: number) => {
        for (const node of nodes) {
          result.push(node);
          if (node.children && expandedIds.has(node.id)) {
            walk(node.children, depth + 1);
          }
        }
      };
      walk(displayOptions, 0);
      return result;
    }, [displayOptions, expandedIds]);

    // Selected set
    const selectedSet = useMemo(
      () => new Set(selectedIds),
      [selectedIds]
    );

    // Get display text for trigger
    const triggerDisplay = useMemo(() => {
      if (selectedIds.length === 0) return null;
      if (mode === 'single') {
        const opt = findOption(options, selectedIds[0]);
        if (!opt) return null;
        const breadcrumb = getBreadcrumb(options, selectedIds[0]);
        return breadcrumb ? breadcrumb.join(' > ') : opt.label;
      }
      return selectedIds
        .map((id) => findOption(options, id))
        .filter(Boolean);
    }, [selectedIds, options, mode]);

    // Handlers
    const toggleOpen = useCallback(() => {
      if (disabled) return;
      setIsOpen(!isOpen);
    }, [disabled, isOpen, setIsOpen]);

    const handleSelect = useCallback(
      (id: string) => {
        if (mode === 'single') {
          setSelectedIds([id]);
          if (!showApplyButton) {
            setIsOpen(false);
          }
        } else {
          setSelectedIds(
            selectedIds.includes(id)
              ? selectedIds.filter((s) => s !== id)
              : [...selectedIds, id]
          );
        }
      },
      [mode, selectedIds, setSelectedIds, setIsOpen, showApplyButton]
    );

    const handleToggleExpand = useCallback(
      (id: string) => {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      },
      []
    );

    const handleRemoveChip = useCallback(
      (id: string) => {
        setSelectedIds(selectedIds.filter((s) => s !== id));
      },
      [selectedIds, setSelectedIds]
    );

    const handleClearAll = useCallback(() => {
      setSelectedIds([]);
    }, [setSelectedIds]);

    const handleApply = useCallback(() => {
      onApply?.(selectedIds);
      setIsOpen(false);
    }, [selectedIds, onApply, setIsOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (disabled) return;

        // Don't intercept keystrokes when typing in the search input
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT') {
          if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
          }
          return;
        }

        switch (e.key) {
          case 'Enter':
          case ' ': {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            } else if (activeDescendant) {
              const opt = findOption(options, activeDescendant);
              if (opt?.children && mode === 'single') {
                handleToggleExpand(activeDescendant);
              } else {
                handleSelect(activeDescendant);
                if (opt?.children) {
                  handleToggleExpand(activeDescendant);
                }
              }
            }
            break;
          }
          case 'Escape': {
            e.preventDefault();
            setIsOpen(false);
            break;
          }
          case 'ArrowDown': {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              break;
            }
            const currentIdx = visibleItems.findIndex(
              (i) => i.id === activeDescendant
            );
            const nextIdx = Math.min(currentIdx + 1, visibleItems.length - 1);
            setActiveDescendant(visibleItems[nextIdx]?.id ?? '');
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            const curIdx = visibleItems.findIndex(
              (i) => i.id === activeDescendant
            );
            const prevIdx = Math.max(curIdx - 1, 0);
            setActiveDescendant(visibleItems[prevIdx]?.id ?? '');
            break;
          }
          case 'ArrowRight': {
            e.preventDefault();
            if (activeDescendant) {
              const opt = findOption(options, activeDescendant);
              if (opt?.children && !expandedIds.has(activeDescendant)) {
                handleToggleExpand(activeDescendant);
              }
            }
            break;
          }
          case 'ArrowLeft': {
            e.preventDefault();
            if (activeDescendant && expandedIds.has(activeDescendant)) {
              handleToggleExpand(activeDescendant);
            }
            break;
          }
          case 'Home': {
            e.preventDefault();
            if (visibleItems.length > 0) {
              setActiveDescendant(visibleItems[0].id);
            }
            break;
          }
          case 'End': {
            e.preventDefault();
            if (visibleItems.length > 0) {
              setActiveDescendant(visibleItems[visibleItems.length - 1].id);
            }
            break;
          }
        }
      },
      [
        disabled,
        isOpen,
        activeDescendant,
        visibleItems,
        expandedIds,
        options,
        mode,
        setIsOpen,
        handleSelect,
        handleToggleExpand,
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

    // Focus search when opening
    useEffect(() => {
      let rafId: number;
      if (isOpen && searchable) {
        rafId = requestAnimationFrame(() => {
          searchRef.current?.focus();
        });
      }
      if (isOpen) {
        setSearchQuery('');
      }
      return () => cancelAnimationFrame(rafId);
    }, [isOpen, searchable]);

    // Scroll active item into view
    useEffect(() => {
      if (activeDescendant && listRef.current) {
        const el = listRef.current.querySelector(
          `#tree-item-${activeDescendant}`
        );
        el?.scrollIntoView({ block: 'nearest' });
      }
    }, [activeDescendant]);

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn(styles.root, className)}
        data-size={size}
        data-disabled={disabled || undefined}
        data-open={isOpen || undefined}
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
          aria-haspopup="tree"
          aria-controls={listboxId}
          aria-labelledby={labelId}
          aria-label={!label ? ariaLabel || placeholder : undefined}
          aria-disabled={disabled || undefined}
          aria-activedescendant={
            isOpen && activeDescendant
              ? `tree-item-${activeDescendant}`
              : undefined
          }
          tabIndex={disabled ? -1 : 0}
          className={styles.trigger}
          onClick={toggleOpen}
        >
          {/* Chips (multi mode) or text (single mode) */}
          <div className={styles.triggerContent}>
            {mode === 'multi' && selectedIds.length > 0 ? (
              <>
                {selectedIds.map((id) => {
                  const opt = findOption(options, id);
                  if (!opt) return null;
                  return (
                    <span key={id} className={styles.chip}>
                      <span className={styles.chipLabel}>{opt.label}</span>
                      <button
                        type="button"
                        className={styles.chipRemove}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveChip(id);
                        }}
                        aria-label={`Remove ${opt.label}`}
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
                  );
                })}
                {searchable && isOpen && (
                  <input
                    ref={searchRef}
                    type="text"
                    className={styles.inlineSearch}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchQuery ? '' : searchPlaceholder}
                    aria-label="Search options"
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </>
            ) : mode === 'single' && triggerDisplay ? (
              <span className={styles.triggerText}>
                {triggerDisplay as string}
              </span>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
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
            {/* Search (single mode shows search in dropdown) */}
            {searchable && mode === 'single' && (
              <div className={styles.search}>
                <svg
                  className={styles.searchIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Search options"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Tree */}
            <div
              ref={listRef}
              id={listboxId}
              role="tree"
              aria-label={ariaLabel || label || placeholder}
              aria-multiselectable={mode === 'multi' || undefined}
              className={styles.list}
            >
              {displayOptions.length > 0 ? (
                displayOptions.map((option) => (
                  <TreeItem
                    key={option.id}
                    option={option}
                    depth={0}
                    mode={mode}
                    selectedIds={selectedSet}
                    expandedIds={expandedIds}
                    activeDescendant={activeDescendant}
                    onSelect={handleSelect}
                    onToggleExpand={handleToggleExpand}
                    options={options}
                  />
                ))
              ) : (
                <div className={styles.empty}>No results found</div>
              )}
            </div>

            {/* Footer (multi mode) */}
            {mode === 'multi' && (
              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={handleClearAll}
                >
                  {clearButtonLabel}
                </button>
                {showApplyButton && (
                  <button
                    type="button"
                    className={styles.applyButton}
                    onClick={handleApply}
                  >
                    {applyButtonLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

HierarchicalSelect.displayName = 'HierarchicalSelect';
export { HierarchicalSelect };
