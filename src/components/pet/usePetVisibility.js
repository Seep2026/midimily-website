import { useEffect, useState } from 'react';
import { sitePetConfig } from './petConfig';

function readClosedState() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(sitePetConfig.storageKey) === 'true';
}

function readMobileState() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(sitePetConfig.mobileMediaQuery).matches;
}

export function usePetVisibility() {
  const [isClosed, setIsClosed] = useState(readClosedState);
  const [isMobile, setIsMobile] = useState(readMobileState);
  const [isExpanded, setIsExpanded] = useState(() => !readMobileState());

  useEffect(() => {
    const media = window.matchMedia(sitePetConfig.mobileMediaQuery);
    const handleChange = () => {
      const nextIsMobile = media.matches;
      setIsMobile(nextIsMobile);
      setIsExpanded(!nextIsMobile);
    };

    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const closePet = () => {
    window.localStorage.setItem(sitePetConfig.storageKey, 'true');
    setIsClosed(true);
  };

  const expandPet = () => {
    setIsExpanded(true);
  };

  return {
    closePet,
    expandPet,
    isClosed,
    isExpanded,
    isMobile,
  };
}
