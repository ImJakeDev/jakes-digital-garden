import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../../env';
import ms from 'milliseconds';

const fetchGeolocation = async (lat: number, lng: number) => {
  // const response = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
  const response = axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`);
  const data = (await response).data;

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
