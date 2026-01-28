import type { ComponentPropsWithoutRef } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Whether to animate the skeleton */
  animation?: 'pulse' | 'wave' | 'none';
  /** Number of text lines (only for text variant) */
  lines?: number;
}
