import type { Metadata } from 'next';
import { STIX_Two_Text, Manrope, Fira_Code } from 'next/font/google';
import './style.linaria.global';
import Providers from './providers';
import Layout from '@/components/layouts/Layout';

const stixTwoText = STIX_Two_Text({
  subsets: ['latin'],
  variable: '--stix-two-text',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--manrope',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jake's Digital Garden",
  description: 'A place where digital seeds are planted...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${stixTwoText.variable} ${manrope.variable} ${firaCode.variable}`}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
