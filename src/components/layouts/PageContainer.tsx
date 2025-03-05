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
  const { position, error: geolocationError } = useUserGeolocation();
  console.log('position', position);
  console.log('geolocationError', geolocationError);

  const { data, error, isLoading } = useOpenMeteo({ latitude: position?.coords.latitude, longitude: position?.coords.longitude });
  console.log(`weather data`, data);
  console.log(`weather error`, error);
  console.log(`weather isLoading`, isLoading);

  const { data: geolocationData } = useReverseGeocoding(position?.coords.latitude ?? 0, position?.coords.longitude ?? 0);
  console.log(`geolocation data`, geolocationData);

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
