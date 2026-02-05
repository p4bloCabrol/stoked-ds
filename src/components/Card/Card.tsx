import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardImageProps,
} from './Card.types';
import styles from './Card.module.css';

// Spring animation config for hover
const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

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
  const isInteractive = isClickable || isHoverable;

  // Use motion.article for interactive cards
  if (isInteractive) {
    // Filter out incompatible props for motion component
    const { onAnimationStart, onDrag, onDragEnd, onDragStart, ...motionRest } =
      rest as CardProps & HTMLMotionProps<'article'>;

    return (
      <motion.article
        ref={ref}
        className={cn(styles.card, className)}
        data-variant={variant}
        data-clickable={isClickable || undefined}
        data-hoverable={isHoverable || undefined}
        data-animated="true"
        tabIndex={isClickable ? 0 : undefined}
        whileHover={{
          y: -4,
          scale: 1.01,
        }}
        whileTap={isClickable ? { scale: 0.99 } : undefined}
        transition={springTransition}
        {...motionRest}
      >
        {children}
      </motion.article>
    );
  }

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
