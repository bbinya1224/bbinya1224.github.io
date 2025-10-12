import Header from "@/widgets/header/ui/Header";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative mx-auto max-w-[var(--page-width)]">
      <Header />
      <article className="mx-4 flex flex-row gap-8">
        <Sidebar className="hidden md:block" />

        {children}
      </article>
    </section>
  );
};

export default Layout;
