import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useQueryParams = (key: string, value: string) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, encodeURIComponent(value));
    } else {
      params.delete(key);
    }

    window.history.pushState(null, '', `?${params.toString()}`);
  }, [value, searchParams, key]);
};
