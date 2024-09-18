import { useSyncExternalStore } from 'react';

export const useMediaQuery = (media: string) => {
  const getSnapshot = () => window.matchMedia(media).matches;
  const subscribe = (mediaChange: EventListener) => {
    const matchMedia = window.matchMedia(media);
    matchMedia.addEventListener('change', mediaChange);

    return () => {
      matchMedia.removeEventListener('change', mediaChange);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};
