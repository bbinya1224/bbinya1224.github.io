import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: 'Bbinya Blog',
  description: 'Bbinya의 개발 블로그',
};

export default RootLayout;
