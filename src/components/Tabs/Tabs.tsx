import { forwardRef, useState, Children, isValidElement, cloneElement, useRef, useCallback, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import { TabsContext, useTabs } from './TabsContext';
import type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelsProps,
  TabPanelProps,
} from './Tabs.types';
import styles from './Tabs.module.css';

const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    variant = 'line',
    size = 'md',
    defaultIndex = 0,
    index: controlledIndex,
    onChange,
    isFitted = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const isControlled = controlledIndex !== undefined;
  const selectedIndex = isControlled ? controlledIndex : internalIndex;
  const baseId = useId('tabs');

  const setSelectedIndex = useCallback(
    (newIndex: number) => {
      if (!isControlled) {
        setInternalIndex(newIndex);
      }
      onChange?.(newIndex);
    },
    [isControlled, onChange]
  );

  return (
    <TabsContext.Provider value={{ selectedIndex, setSelectedIndex, variant, size, isFitted, baseId }}>
      <div ref={ref} className={cn(styles.tabs, className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { className, children, ...rest },
  ref
) {
  const { variant, isFitted, setSelectedIndex, baseId } = useTabs();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, currentIndex: number, totalTabs: number) => {
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = currentIndex === 0 ? totalTabs - 1 : currentIndex - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newIndex = currentIndex === totalTabs - 1 ? 0 : currentIndex + 1;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = totalTabs - 1;
          break;
        default:
          return;
      }

      // Find next non-disabled tab
      const tabs = Children.toArray(children).filter(isValidElement);
      let attempts = 0;
      while (attempts < totalTabs) {
        const tab = tabs[newIndex] as React.ReactElement<TabProps>;
        if (!tab.props.isDisabled) {
          setSelectedIndex(newIndex);
          tabRefs.current[newIndex]?.focus();
          break;
        }
        newIndex = e.key === 'ArrowLeft' || e.key === 'Home'
          ? newIndex === 0 ? totalTabs - 1 : newIndex - 1
          : newIndex === totalTabs - 1 ? 0 : newIndex + 1;
        attempts++;
      }
    },
    [children, setSelectedIndex]
  );

  const tabs = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const totalTabs = Children.count(children);
      return cloneElement(child, {
        'data-index': index,
        'data-tab-id': `${baseId}-tab-${index}`,
        'data-panel-id': `${baseId}-panel-${index}`,
        ref: (el: HTMLButtonElement) => {
          tabRefs.current[index] = el;
        },
        onKeyDown: (e: KeyboardEvent) => handleKeyDown(e, index, totalTabs),
      } as Record<string, unknown>);
    }
    return child;
  });

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn(styles.tabList, className)}
      data-variant={variant}
      data-fitted={isFitted || undefined}
      {...rest}
    >
      {tabs}
    </div>
  );
});

const Tab = forwardRef<HTMLButtonElement, TabProps & {
  'data-index'?: number;
  'data-tab-id'?: string;
  'data-panel-id'?: string;
}>(function Tab(
  {
    isDisabled = false,
    className,
    children,
    'data-index': index = 0,
    'data-tab-id': tabId,
    'data-panel-id': panelId,
    ...rest
  },
  ref
) {
  const { selectedIndex, setSelectedIndex, variant, size } = useTabs();
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={isDisabled}
      className={cn(styles.tab, className)}
      data-variant={variant}
      data-size={size}
      onClick={() => setSelectedIndex(index)}
      {...rest}
    >
      {children}
    </button>
  );
});

const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels(
  { className, children, ...rest },
  ref
) {
  const { baseId } = useTabs();

  const panels = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        'data-index': index,
        'data-panel-id': `${baseId}-panel-${index}`,
        'data-tab-id': `${baseId}-tab-${index}`,
      } as Record<string, unknown>);
    }
    return child;
  });

  return (
    <div ref={ref} className={cn(styles.tabPanels, className)} {...rest}>
      {panels}
    </div>
  );
});

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps & {
  'data-index'?: number;
  'data-panel-id'?: string;
  'data-tab-id'?: string;
}>(function TabPanel(
  {
    className,
    children,
    'data-index': index = 0,
    'data-panel-id': panelId,
    'data-tab-id': tabId,
    ...rest
  },
  ref
) {
  const { selectedIndex } = useTabs();
  const isSelected = selectedIndex === index;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={!isSelected}
      className={cn(styles.tabPanel, className)}
      {...rest}
    >
      {isSelected && children}
    </div>
  );
});

Tabs.displayName = 'Tabs';
TabList.displayName = 'TabList';
Tab.displayName = 'Tab';
TabPanels.displayName = 'TabPanels';
TabPanel.displayName = 'TabPanel';

export { Tabs, TabList, Tab, TabPanels, TabPanel };
