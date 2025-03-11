'use client';
import { useState, useEffect } from 'react';

const useUserGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  console.log('position:', position);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, setError);
  }, []);

  if (!position || !error) {
    return { position: null, error: { message: 'Browser Navigator Geolocation Position Error' } };
  }

  return { position, error };
};

export default useUserGeolocation;
