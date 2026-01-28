import { useEffect, useRef, useCallback, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './Modal.types';
import styles from './Modal.module.css';

function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  isCentered = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal after a brief delay to ensure it's rendered
      requestAnimationFrame(() => {
        modalRef.current?.focus();
      });

      // Prevent body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      data-centered={isCentered || undefined}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={styles.modal}
        data-size={size}
        onKeyDown={handleKeyDown}
      >
        {showCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ModalHeader({ children, className, ...rest }: ModalHeaderProps) {
  return (
    <div className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
}

function ModalBody({ children, className, ...rest }: ModalBodyProps) {
  return (
    <div className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  );
}

function ModalFooter({ children, className, ...rest }: ModalFooterProps) {
  return (
    <div className={cn(styles.footer, className)} {...rest}>
      {children}
    </div>
  );
}

Modal.displayName = 'Modal';
ModalHeader.displayName = 'ModalHeader';
ModalBody.displayName = 'ModalBody';
ModalFooter.displayName = 'ModalFooter';

export { Modal, ModalHeader, ModalBody, ModalFooter };
