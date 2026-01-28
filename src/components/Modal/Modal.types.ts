import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal content */
  children: ReactNode;
  /** Size preset */
  size?: ModalSize;
  /** Whether clicking the backdrop closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEsc?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether to center the modal vertically */
  isCentered?: boolean;
  /** Accessible title for the modal */
  'aria-label'?: string;
  /** ID of element that labels the modal */
  'aria-labelledby'?: string;
  /** ID of element that describes the modal */
  'aria-describedby'?: string;
}

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface ModalBodyProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}
