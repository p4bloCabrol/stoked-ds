import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names. Thin wrapper around clsx for consistency.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
