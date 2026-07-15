'use client';
import { useState, useEffect } from 'react';
import ms from 'milliseconds';

const useUserGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, setError, { timeout: ms.seconds(10) });
  }, []);

  return { position, error };
};

export default useUserGeolocation;
