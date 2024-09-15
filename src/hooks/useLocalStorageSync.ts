import { useSyncExternalStore } from 'react';

export function useLocalStorageSync(key: string, initValue: string = '') {
  const isUserClient = typeof window !== 'undefined';
  const getSnapshot = () => {
    if (isUserClient) {
      const item = localStorage.getItem(key);
      return item !== null ? item : initValue;
    }

    return '';
  };
  const subscribe = (cb: () => void) => {
    const handleStorageChsnge = (e: StorageEvent) => {
      if (isUserClient && e.key === key) {
        cb();
      }
    };

    isUserClient && window.addEventListener('storage', handleStorageChsnge);

    return () => {
      if (isUserClient) {
        window.removeEventListener('storage', handleStorageChsnge);
      }
    };
  };

  const localStorageValue = useSyncExternalStore(subscribe, getSnapshot);
  const setLocalStorageValue = (newValue: string) => {
    if (isUserClient) {
      if (newValue) {
        const value =
          typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    }
  };

  return [localStorageValue, setLocalStorageValue] as const;
}
