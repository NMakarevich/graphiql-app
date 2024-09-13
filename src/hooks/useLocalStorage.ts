import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initValue: string = '') {
  const readLocalStorageValue = () => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item !== null ? item : initValue;
    }
    return initValue;
  };

  const [localStorageValue, setLocalStorageValue] = useState<string>(
    readLocalStorageValue()
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorageValue) {
        localStorage.setItem(key, localStorageValue);
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue] as const;
}
