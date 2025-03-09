import { styled } from '@linaria/react';

export default function PageContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
