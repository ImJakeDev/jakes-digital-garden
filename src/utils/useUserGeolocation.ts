'use client';
import { useState, useEffect } from 'react';

const useUserGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, setError);
  }, []);

  return { position, error };
};

export default useUserGeolocation;
