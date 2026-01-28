import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ComponentPropsWithoutRef<'article'> {
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Whether the card is interactive (clickable) */
  isClickable?: boolean;
  /** Whether the card has hover effects */
  isHoverable?: boolean;
  /** Card content */
  children?: ReactNode;
}

export interface CardHeaderProps extends ComponentPropsWithoutRef<'header'> {
  /** Header content */
  children?: ReactNode;
}

export interface CardBodyProps extends ComponentPropsWithoutRef<'div'> {
  /** Body content */
  children?: ReactNode;
}

export interface CardFooterProps extends ComponentPropsWithoutRef<'footer'> {
  /** Footer content */
  children?: ReactNode;
}

export interface CardImageProps extends ComponentPropsWithoutRef<'img'> {
  /** Image source */
  src: string;
  /** Image alt text */
  alt: string;
}
