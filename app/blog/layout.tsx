import Footer from "@/widgets/footer/ui/Footer";
import Header from "@/widgets/header/ui/Header";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative mx-auto max-w-[var(--page-width)] px-4 pb-8">
      <article className="flex flex-col-reverse gap-8 lg:flex-row">
        <Sidebar />
        <Header />
        {children}
      </article>
      <Footer />
    </section>
  );
};

export default Layout;
