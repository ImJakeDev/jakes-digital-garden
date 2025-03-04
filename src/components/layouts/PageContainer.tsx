'use client';

import useOpenMeteo from '@/services/hooks/useOpenMeteo';
import useUserGeolocation from '@/utils/useUserGeolocation';
import { styled } from '@linaria/react';

export default function PageContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { position, error: geolocationError } = useUserGeolocation();
  console.log('position', position);
  console.log('geolocationError', geolocationError);

  const { data, error, isLoading } = useOpenMeteo({ latitude: position?.coords.latitude, longitude: position?.coords.longitude });
  console.log(`weather data`, data);
  console.log(`weather error`, error);
  console.log(`weather isLoading`, isLoading);

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
