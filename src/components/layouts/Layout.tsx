'use client';

import { styled } from '@linaria/react';
import Footer from '@/components/layouts/Footer';
import Main from '@/components/layouts/Main';
import Header from '@/components/layouts/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StyledNoise />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

const StyledNoise = styled.div`
  /* prettier-ignore */
  background-image: url("/noise.png");
  position: fixed;
  inset: 0;
  mix-blend-mode: hard-light;
  pointer-events: none;
  z-index: -1;
`;
