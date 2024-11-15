import { useSyncExternalStore } from 'react';

export function useLocalStorage(key: string, initValue: string = '') {
  const getSnapshot = () => {
    const item = localStorage.getItem(key);
    return item !== null ? item : initValue;
  };

  const getServerSnapshot = () => initValue;

  const subscribe = (cb: () => void) => {
    const handleStorageChsnge = (e: StorageEvent) => {
      if (e.key === key) {
        cb();
      }
    };

    window.addEventListener('storage', handleStorageChsnge);

    return () => {
      window.removeEventListener('storage', handleStorageChsnge);
    };
  };

  const localStorageValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setLocalStorageValue = (newValue: string) => {
    if (newValue) {
      const value =
        typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  };

  return [localStorageValue, setLocalStorageValue] as const;
}
