import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../../env';
import ms from 'milliseconds';
import FeatureCollection from '@/types/GeoapifyResponse';

const fetchGeolocation = async (lat: number, lng: number) => {
  // https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/
  const response = axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat.toFixed()}&lon=${lng.toFixed()}&apiKey=${env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`);
  const data = (await response).data as FeatureCollection;

  return data;
};

const useReverseGeocoding = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ['reverse-geocoding', lat, lng],
    queryFn: () => fetchGeolocation(lat, lng),
    staleTime: ms.hours(1),
  });
};

export default useReverseGeocoding;
