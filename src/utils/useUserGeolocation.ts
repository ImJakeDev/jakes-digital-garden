import { useState, useEffect } from 'react';

const useUserGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      setPosition(position);
    };

    const failure = (error: GeolocationPositionError) => {
      setError(error);
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  return { position, error };
};

export default useUserGeolocation;
