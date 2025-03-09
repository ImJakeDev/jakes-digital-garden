'use client';

import useOpenMeteo from '@/services/hooks/useOpenMeteo';
import useReverseGeocoding from '@/services/hooks/useReverseGeocoding';
import useUserGeolocation from '@/utils/useUserGeolocation';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export default function WeatherStation() {
  const { position, error: userGeolocationError } = useUserGeolocation();
  const { data: openMeteoData, error: openMeteoError, isLoading: openMeteoIsLoading } = useOpenMeteo({ latitude: position?.coords.latitude, longitude: position?.coords.longitude });
  const { data: geolocationData, error: geolocationError, isLoading: geolocationIsLoading } = useReverseGeocoding(position?.coords.latitude ?? 0, position?.coords.longitude ?? 0);

  if (geolocationIsLoading || openMeteoIsLoading) {
    return <div>Loading...</div>;
  }

  if (userGeolocationError || openMeteoError || geolocationError) {
    return <div>Error: {userGeolocationError?.message ?? openMeteoError?.message ?? geolocationError?.message}</div>;
  }

  if (!openMeteoData || !geolocationData) {
    return <div>No data available.</div>;
  }

  const date = new Date(openMeteoData.current.time);
  const formattedDate = format(date, 'MMMM dd, yyyy hh:mm:ss a', {
    locale: enUS,
  });
  const formattedLocation = `${geolocationData.features[0].properties.city}, ${geolocationData.features[0].properties.state}`;

  return (
    <div>
      <h4>WeatherStation:</h4>
      <ul>
        <li>
          <span>{`Location: ${formattedLocation}`}</span>
        </li>
        <li>
          <span>{`Temperature: ${openMeteoData.current.temperature.toFixed(1)}°F`}</span>
        </li>
        <li>
          <span>{`Time: ${formattedDate}`}</span>
        </li>
        <li>
          <span>{`Weather Code: ${openMeteoData.current.weatherCode}`}</span>
        </li>
      </ul>
    </div>
  );
}
