import { useId as useReactId } from 'react';

/**
 * Generate a stable unique ID.
 * Wraps React.useId with an optional prefix for better debugging.
 */
export function useId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}
