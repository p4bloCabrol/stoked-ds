import type { InputProps } from '../Input/Input.types';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  /** Callback when search is submitted (Enter key) */
  onSearch?: (value: string) => void;
}
