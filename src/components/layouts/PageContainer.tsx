import { styled } from '@linaria/react';

export default function PageContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StyledPageContainer>{children}</StyledPageContainer>;
}

const StyledPageContainer = styled.div`
  padding-block: var(--grid-gutter);
`;
