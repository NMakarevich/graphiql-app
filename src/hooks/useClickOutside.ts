import { MutableRefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: MutableRefObject<HTMLTemplateElement | null>,
  callback: () => void
): void => {
  const handleClick = (e: Event): void => {
    e.stopPropagation();
    const target = e.target as HTMLTemplateElement;

    if (ref.current && !ref.current.contains(target)) {
      callback();
    }
  };

  useEffect((): (() => void) => {
    document.addEventListener('click', handleClick);

    return (): void => {
      document.removeEventListener('click', handleClick);
    };
  });
};
