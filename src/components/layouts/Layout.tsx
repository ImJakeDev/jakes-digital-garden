'use client';

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
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
