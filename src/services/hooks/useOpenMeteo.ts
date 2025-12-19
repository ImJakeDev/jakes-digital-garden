import celsiusToFahrenheit from '@/utils/celsiusToFahrenheit';
import { useQuery } from '@tanstack/react-query';
import ms from 'milliseconds';
import { fetchWeatherApi } from 'openmeteo';

interface UserPosition {
  latitude: number;
  longitude: number;
}

const fetchTheWeather = async (userPosition: UserPosition) => {
  // https://open-meteo.com/en/docs
  // Todo: clean up
  const params = {
    latitude: userPosition.latitude,
    longitude: userPosition.longitude,
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  };
  const url = 'https://api.open-meteo.com/v1/forecast';

  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const locationLatitude = response.latitude();
  // const locationLongitude = response.longitude();

  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current?.time()) + utcOffsetSeconds) * 1000),
      temperature: celsiusToFahrenheit(current?.variables(0)?.value() ?? 0), // Current is only 1 value, therefore `.value()`
      weatherCode: current?.variables(1)?.value() ?? null,
      windSpeed: current?.variables(2)?.value() ?? 0,
      windDirection: current?.variables(3)?.value() ?? 0,
    },
    hourly: {
      time: range(Number(hourly?.time() ?? 0), Number(hourly?.timeEnd() ?? 0), hourly?.interval() ?? 1).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature: hourly?.variables(0)?.valuesArray() ?? [], // `.valuesArray()` get an array of floats
      precipitation: hourly?.variables(1)?.valuesArray() ?? [],
    },
    daily: {
      time: range(Number(daily?.time() ?? 0), Number(daily?.timeEnd() ?? 0), daily?.interval() ?? 1).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily?.variables(0)?.valuesArray() ?? [],
      temperatureMax: daily?.variables(1)?.valuesArray() ?? [],
      temperatureMin: daily?.variables(2)?.valuesArray() ?? [],
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  // for (let i = 0; i < weatherData.daily.time.length; i++) {
  //   console.log(weatherData.daily.time[i].toISOString(), weatherData.daily.weatherCode[i], weatherData.daily.temperatureMax[i], weatherData.daily.temperatureMin[i]);
  // }

  return weatherData;
};

const useOpenMeteo = (userPosition: UserPosition) => {
  return useQuery({
    queryKey: ['open-meteo', userPosition],
    queryFn: () => fetchTheWeather(userPosition),
    staleTime: ms.hours(1),
  });
};

export default useOpenMeteo;
