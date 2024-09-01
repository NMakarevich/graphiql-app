import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, initValue: string = '') {
  const readLocalStorageValue = () => {
    const item = localStorage.getItem(key);
    return item !== null ? item : initValue;
  };

  const [localStorageValue, setLocalStorageValue] = useState<string>(
    readLocalStorageValue()
  );

  useEffect(() => {
    if (localStorageValue) {
      localStorage.setItem(key, localStorageValue);
    } else {
      localStorage.removeItem(key);
    }
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue] as const;
}
