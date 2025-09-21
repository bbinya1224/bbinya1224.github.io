import Header from '@/shared/ui/Header';
import type { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
