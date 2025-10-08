import Header from '@/widgets/header/ui/Header';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <Header />
      <main>{children}</main>
    </section>
  );
};

export default Layout;
