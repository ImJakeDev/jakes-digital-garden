import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '../../env';

const fetchGeolocation = async (lat: number, lng: number) => {
  const response = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${env.NEXT_PUBLIC_GOOGLE_API_KEY}`);

  return response;
};

const useReverseGeocoding = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ['reverse-geocoding', lat, lng],
    queryFn: () => fetchGeolocation(lat, lng),
    staleTime: Infinity,
  });
};

export default useReverseGeocoding;
