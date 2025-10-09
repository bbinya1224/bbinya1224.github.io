import Header from "@/widgets/header/ui/Header";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative mx-auto max-w-[var(--page-width)]">
      <Header />
      <article className="mx-4 flex flex-row">
        <Sidebar className="hidden md:block" />

        <main className="w-full">{children}</main>
      </article>
    </section>
  );
};

export default Layout;
