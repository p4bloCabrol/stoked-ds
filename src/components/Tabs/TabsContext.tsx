import { createContext, useContext } from 'react';
import type { TabsContextValue } from './Tabs.types';

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs');
  }
  return context;
}
