import { forwardRef, useState, useCallback, Children, isValidElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import { AccordionContext, AccordionItemContext, useAccordion, useAccordionItem } from './AccordionContext';
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionButtonProps,
  AccordionPanelProps,
} from './Accordion.types';
import styles from './Accordion.module.css';

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    allowMultiple = false,
    defaultIndex,
    index: controlledIndex,
    onChange,
    className,
    children,
    ...rest
  },
  ref
) {
  const [internalExpanded, setInternalExpanded] = useState<number[]>(() => {
    if (defaultIndex !== undefined) {
      return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex];
    }
    return [];
  });

  const isControlled = controlledIndex !== undefined;
  const expandedItems = isControlled
    ? Array.isArray(controlledIndex)
      ? controlledIndex
      : [controlledIndex]
    : internalExpanded;

  const toggleItem = useCallback(
    (itemIndex: number) => {
      const isExpanded = expandedItems.includes(itemIndex);
      let newExpanded: number[];

      if (isExpanded) {
        newExpanded = expandedItems.filter((i) => i !== itemIndex);
      } else {
        newExpanded = allowMultiple ? [...expandedItems, itemIndex] : [itemIndex];
      }

      if (!isControlled) {
        setInternalExpanded(newExpanded);
      }

      onChange?.(allowMultiple ? newExpanded : newExpanded[0] ?? -1);
    },
    [expandedItems, allowMultiple, isControlled, onChange]
  );

  // Clone children to inject index
  const items = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, { 'data-index': index } as Record<string, unknown>);
    }
    return child;
  });

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, allowMultiple }}>
      <div ref={ref} className={cn(styles.accordion, className)} {...rest}>
        {items}
      </div>
    </AccordionContext.Provider>
  );
});

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps & { 'data-index'?: number }>(
  function AccordionItem({ isDisabled = false, className, children, 'data-index': index = 0, ...rest }, ref) {
    const { expandedItems } = useAccordion();
    const isExpanded = expandedItems.includes(index);
    const baseId = useId('accordion-item');
    const buttonId = `${baseId}-button`;
    const panelId = `${baseId}-panel`;

    return (
      <AccordionItemContext.Provider
        value={{ index, isExpanded, isDisabled, buttonId, panelId }}
      >
        <div
          ref={ref}
          className={cn(styles.item, className)}
          data-expanded={isExpanded || undefined}
          data-disabled={isDisabled || undefined}
          {...rest}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

const AccordionButton = forwardRef<HTMLButtonElement, AccordionButtonProps>(
  function AccordionButton({ className, children, ...rest }, ref) {
    const { toggleItem } = useAccordion();
    const { index, isExpanded, isDisabled, buttonId, panelId } = useAccordionItem();

    return (
      <button
        ref={ref}
        type="button"
        id={buttonId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        disabled={isDisabled}
        className={cn(styles.button, className)}
        onClick={() => toggleItem(index)}
        {...rest}
      >
        {children}
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    );
  }
);

const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  function AccordionPanel({ className, children, ...rest }, ref) {
    const { isExpanded, buttonId, panelId } = useAccordionItem();

    return (
      <div
        ref={ref}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(styles.panel, className)}
        data-state={isExpanded ? 'open' : 'closed'}
        hidden={!isExpanded}
        {...rest}
      >
        <div className={styles.panelContent}>{children}</div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionButton.displayName = 'AccordionButton';
AccordionPanel.displayName = 'AccordionPanel';

export { Accordion, AccordionItem, AccordionButton, AccordionPanel };
