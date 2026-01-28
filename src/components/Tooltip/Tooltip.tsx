import {
  cloneElement,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactElement,
} from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import type { TooltipProps } from './Tooltip.types';
import styles from './Tooltip.module.css';

function Tooltip({
  content,
  children,
  placement = 'top',
  delayShow = 200,
  delayHide = 0,
  disabled = false,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipId = useId('tooltip');

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeouts();
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayShow);
  }, [disabled, delayShow, clearTimeouts]);

  const hide = useCallback(() => {
    clearTimeouts();
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delayHide);
  }, [delayHide, clearTimeouts]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    },
    [isVisible]
  );

  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  const trigger = cloneElement(children as ReactElement, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (children.props as { onMouseEnter?: (e: React.MouseEvent) => void }).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (children.props as { onMouseLeave?: (e: React.MouseEvent) => void }).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (children.props as { onFocus?: (e: React.FocusEvent) => void }).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (children.props as { onBlur?: (e: React.FocusEvent) => void }).onBlur?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      handleKeyDown(e);
      (children.props as { onKeyDown?: (e: React.KeyboardEvent) => void }).onKeyDown?.(e);
    },
    'aria-describedby': isVisible ? tooltipId : undefined,
  });

  if (disabled) {
    return children;
  }

  return (
    <span className={styles.wrapper}>
      {trigger}
      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(styles.tooltip, className)}
          data-placement={placement}
        >
          {content}
          <span className={styles.arrow} aria-hidden="true" />
        </span>
      )}
    </span>
  );
}

Tooltip.displayName = 'Tooltip';
export { Tooltip };
