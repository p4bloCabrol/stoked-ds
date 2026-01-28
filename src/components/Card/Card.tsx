import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardImageProps,
} from './Card.types';
import styles from './Card.module.css';

const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'elevated',
    isClickable = false,
    isHoverable = false,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <article
      ref={ref}
      className={cn(styles.card, className)}
      data-variant={variant}
      data-clickable={isClickable || undefined}
      data-hoverable={isHoverable || undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...rest}
    >
      {children}
    </article>
  );
});

const CardHeader = forwardRef<HTMLElement, CardHeaderProps>(function CardHeader(
  { className, children, ...rest },
  ref
) {
  return (
    <header ref={ref} className={cn(styles.header, className)} {...rest}>
      {children}
    </header>
  );
});

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  );
});

const CardFooter = forwardRef<HTMLElement, CardFooterProps>(function CardFooter(
  { className, children, ...rest },
  ref
) {
  return (
    <footer ref={ref} className={cn(styles.footer, className)} {...rest}>
      {children}
    </footer>
  );
});

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(function CardImage(
  { className, src, alt, ...rest },
  ref
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(styles.image, className)}
      {...rest}
    />
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';
CardImage.displayName = 'CardImage';

export { Card, CardHeader, CardBody, CardFooter, CardImage };
