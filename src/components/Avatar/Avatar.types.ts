import type { ComponentPropsWithoutRef } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (initials) when image is not available */
  fallback?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Whether to show a status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Callback when image fails to load */
  onError?: () => void;
}
