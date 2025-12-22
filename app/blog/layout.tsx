import type { ReactNode } from "react";
import Header from "@/widgets/header/ui/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative mx-auto max-w-[var(--page-width)] px-4 pt-16 pb-8 sm:px-8">
      <Header />
      {children}
    </section>
  );
};

export default Layout;
