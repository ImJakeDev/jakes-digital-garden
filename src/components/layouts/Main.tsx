import { styled } from '@linaria/react';

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StyledMain>{children}</StyledMain>;
}

const StyledMain = styled.main`
  max-width: var(--grid-max-width);
  padding-inline: var(--grid-gutter);
  margin-inline: auto;
`;
