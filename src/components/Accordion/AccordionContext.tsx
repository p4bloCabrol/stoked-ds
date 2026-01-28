import { createContext, useContext } from 'react';
import type { AccordionContextValue, AccordionItemContextValue } from './Accordion.types';

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionButton/Panel must be used within an AccordionItem');
  }
  return context;
}
