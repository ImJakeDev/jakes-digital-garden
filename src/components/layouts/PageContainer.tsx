'use client';

import useOpenMeteo from '@/services/hooks/useOpenMeteo';
import useReverseGeocoding from '@/services/hooks/useReverseGeocoding';
import useUserGeolocation from '@/utils/useUserGeolocation';
import { styled } from '@linaria/react';

export default function PageContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Todo: Move client code somewhere else???
  const { position, error: userGeolocationError } = useUserGeolocation();
  console.log('position', position);
  console.log('geolocationError', userGeolocationError);

  const { data: openMeteoData, error: openMeteoError, isLoading: openMeteoIsLoading } = useOpenMeteo({ latitude: position?.coords.latitude, longitude: position?.coords.longitude });
  console.log(`weather data`, openMeteoData);
  console.log(`weather error`, openMeteoError);
  console.log(`weather isLoading`, openMeteoIsLoading);

  const { data: geolocationData, error: geolocationError, isLoading: geolocationIsLoading } = useReverseGeocoding(position?.coords.latitude ?? 0, position?.coords.longitude ?? 0);
  console.log(`geolocation data`, geolocationData?.features[0].properties.city);
  console.log(`geolocation error`, geolocationError);
  console.log(`geolocation isLoading`, geolocationIsLoading);

  return <StyledPageContainer>{children}</StyledPageContainer>;
}

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-m-l);
  padding-block: var(--grid-gutter);
`;
