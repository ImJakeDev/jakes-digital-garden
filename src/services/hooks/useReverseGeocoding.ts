import { useQuery } from '@tanstack/react-query';
import ms from 'milliseconds';
import { FeatureCollectionSchema } from '@/types/GeoapifyResponse';

const fetchGeolocation = async (lat: number, lng: number) => {
  const searchParams = new URLSearchParams({ lat: String(lat), lng: String(lng) });
  const response = await fetch(`/api/reverse-geocoding?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error(`Reverse geocoding request failed: ${String(response.status)}`);
  }

  return FeatureCollectionSchema.parse(await response.json());
};

const useReverseGeocoding = (position?: { latitude: number; longitude: number }) => {
  return useQuery({
    queryKey: ['reverse-geocoding', position?.latitude, position?.longitude],
    queryFn: () => {
      if (!position) {
        throw new Error('A location is required for reverse geocoding.');
      }

      return fetchGeolocation(position.latitude, position.longitude);
    },
    enabled: Boolean(position),
    staleTime: ms.hours(1),
  });
};

export default useReverseGeocoding;
