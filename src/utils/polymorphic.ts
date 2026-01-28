import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from 'react';

/**
 * Get the ref type for a component
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/**
 * The "as" prop type
 */
type AsProp<C extends ElementType> = {
  as?: C;
};

/**
 * Props to omit when composing polymorphic props
 */
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

/**
 * Polymorphic component props (without ref)
 */
export type PolymorphicComponentProps<C extends ElementType, Props = object> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Polymorphic component props (with ref)
 */
export type PolymorphicComponentPropsWithRef<C extends ElementType, Props = object> =
  PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };
