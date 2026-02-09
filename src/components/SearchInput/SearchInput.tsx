import { forwardRef, type KeyboardEvent } from 'react';
import { Input } from '../Input/Input';
import type { SearchInputProps } from './SearchInput.types';

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onKeyDown, placeholder = 'Search...', ...rest }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch((e.target as HTMLInputElement).value);
      }
      onKeyDown?.(e);
    };

    return (
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        leftIcon={<SearchIcon />}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
export { SearchInput };
