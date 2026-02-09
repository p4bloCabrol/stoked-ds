import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TagColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
export type TagVariant = 'solid' | 'outline';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends Omit<ComponentPropsWithoutRef<'span'>, 'color'> {
  /** Color variant */
  color?: TagColor;
  /** Visual variant */
  variant?: TagVariant;
  /** Size preset */
  size?: TagSize;
  /** Whether the tag can be removed */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Icon to display before the label */
  icon?: ReactNode;
}
