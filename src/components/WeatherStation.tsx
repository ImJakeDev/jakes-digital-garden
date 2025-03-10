'use client';

import useOpenMeteo from '@/services/hooks/useOpenMeteo';
import useReverseGeocoding from '@/services/hooks/useReverseGeocoding';
import useUserGeolocation from '@/utils/useUserGeolocation';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

// https://open-meteo.com/en/docs#daily=weather_code
const WeatherCodeMap: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog and depositing rime fog',
  48: 'Fog and depositing rime fog',
  51: 'Drizzle: Light intensity',
  53: 'Drizzle: Moderate intensity',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light intensity',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Slight intensity',
  63: 'Rain: Moderate intensity',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light intensity',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Slight intensity',
  73: 'Snow fall: Moderate intensity',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers slight',
  86: 'Snow showers heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export default function WeatherStation() {
  // Todo: Work on UX/UI
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
          <span>{`Weather Code: ${WeatherCodeMap[openMeteoData.current.weatherCode]}`}</span>
        </li>
      </ul>
    </div>
  );
}
