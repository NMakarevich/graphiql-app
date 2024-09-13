import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initValue: string = '') {
  const isUserClient = typeof window !== 'undefined';
  const readLocalStorageValue = () => {
    if (isUserClient) {
      const item = localStorage.getItem(key);
      return item !== null ? item : initValue;
    }
    return initValue;
  };

  const [localStorageValue, setLocalStorageValue] = useState<string>(
    readLocalStorageValue()
  );

  useEffect(() => {
    if (isUserClient) {
      if (localStorageValue) {
        localStorage.setItem(key, localStorageValue);
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [key, localStorageValue, isUserClient]);

  return [localStorageValue, setLocalStorageValue] as const;
}
