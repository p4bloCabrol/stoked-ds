import type { MutableRefObject, Ref, RefCallback } from 'react';

/**
 * Merge multiple refs into a single ref callback.
 * Useful when you need to pass a ref to multiple sources.
 */
export function mergeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = instance;
      }
    });
  };
}
