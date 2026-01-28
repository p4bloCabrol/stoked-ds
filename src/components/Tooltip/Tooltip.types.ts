import type { ReactNode, ReactElement } from 'react';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: ReactNode;
  /** The element that triggers the tooltip */
  children: ReactElement;
  /** Placement of the tooltip relative to the trigger */
  placement?: TooltipPlacement;
  /** Delay before showing (in ms) */
  delayShow?: number;
  /** Delay before hiding (in ms) */
  delayHide?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional class name for the tooltip content */
  className?: string;
}
