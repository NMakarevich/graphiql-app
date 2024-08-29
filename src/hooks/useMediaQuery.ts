import { useEffect, useState } from 'react';

export const useMediaQuery = (media: string) => {
  const [isMatchMedia, setIsMatchMedia] = useState(
    window.matchMedia(media).matches
  );
  function mediaChange(e: MediaQueryListEventInit) {
    if (e.matches) {
      setIsMatchMedia(true);
    } else {
      setIsMatchMedia(false);
    }
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(media);
    matchMedia.addEventListener('change', mediaChange);
    mediaChange(matchMedia);

    return () => {
      matchMedia.removeEventListener('change', mediaChange);
    };
  });

  return isMatchMedia;
};
