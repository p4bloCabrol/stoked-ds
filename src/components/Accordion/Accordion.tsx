import { forwardRef, useState, createContext, useContext, Children, isValidElement, cloneElement, Fragment } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import styles from './Accordion.module.css';

// =============================================================================
// Context
// =============================================================================

type AccordionContextValue = {
  expandedItems: number[];
  toggleItem: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');
  return context;
};

// =============================================================================
// Types
// =============================================================================

export type AccordionProps = React.ComponentPropsWithoutRef<'div'> & {
  allowMultiple?: boolean;
  defaultIndex?: number | number[];
};

export type AccordionItemProps = React.ComponentPropsWithoutRef<'div'> & {
  title: React.ReactNode;
  disabled?: boolean;
  'data-index'?: number;
};

// =============================================================================
// Accordion
// =============================================================================

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { allowMultiple = false, defaultIndex, className, children, ...rest },
  ref
) {
  const [expandedItems, setExpandedItems] = useState<number[]>(() => {
    if (defaultIndex !== undefined) {
      return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex];
    }
    return [];
  });

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const isExpanded = prev.includes(index);
      if (isExpanded) {
        return prev.filter((i) => i !== index);
      }
      return allowMultiple ? [...prev, index] : [index];
    });
  };

  // Flatten fragments to properly index children
  const flattenChildren = (children: React.ReactNode): React.ReactElement[] => {
    const result: React.ReactElement[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type === Fragment) {
          result.push(...flattenChildren(child.props.children));
        } else {
          result.push(child);
        }
      }
    });
    return result;
  };

  const items = flattenChildren(children).map((child, index) =>
    cloneElement(child, { 'data-index': index, key: child.key ?? index } as Record<string, unknown>)
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem }}>
      <div ref={ref} className={cn(styles.accordion, className)} {...rest}>
        {items}
      </div>
    </AccordionContext.Provider>
  );
});

// =============================================================================
// AccordionItem (basado en ExpandableSection)
// =============================================================================

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ title, disabled = false, className, children, 'data-index': index = 0, ...rest }, ref) {
    const { expandedItems, toggleItem } = useAccordion();
    const isExpanded = expandedItems.includes(index);
    const baseId = useId('accordion');
    const buttonId = `${baseId}-button`;
    const panelId = `${baseId}-panel`;

    const handleToggle = () => {
      if (disabled) return;
      toggleItem(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(styles.item, className)}
        data-expanded={isExpanded || undefined}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {/* Header */}
        <div
          id={buttonId}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          aria-disabled={disabled}
          className={styles.header}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.title}>{title}</span>
          <svg
            className={styles.chevron}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* Panel - CSS animation like ExpandableSection */}
        {isExpanded && (
          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={styles.panel}
          >
            <div className={styles.content}>{children}</div>
          </div>
        )}
      </div>
    );
  }
);

// =============================================================================
// Exports
// =============================================================================

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';

export { Accordion, AccordionItem };
