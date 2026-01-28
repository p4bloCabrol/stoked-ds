import { createContext, useContext } from 'react';
import type { RadioContextValue } from './Radio.types';

export const RadioContext = createContext<RadioContextValue | null>(null);

export function useRadioContext(): RadioContextValue | null {
  return useContext(RadioContext);
}
