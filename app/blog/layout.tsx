import { Suspense } from "react";
import type { ReactNode } from "react";
import Footer from "@/widgets/footer/ui/Footer";
import Header from "@/widgets/header/ui/Header";
import HeaderSkeleton from "@/widgets/header/ui/skeleton/HeaderSkeleton";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import SidebarSkeleton from "@/widgets/sidebar/ui/skeleton/SidebarSkeleton";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative mx-auto max-w-[var(--page-width)] pb-8">
      <div className="fixed top-0 left-1/2 z-50 w-full max-w-[var(--page-width)] -translate-x-1/2">
        <div className="mx-4">
          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>
        </div>
      </div>
      <main className="mx-4 mt-[7rem] mb-4 flex flex-col-reverse gap-8 lg:flex-row">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        {children}
      </main>
      <Footer />
    </section>
  );
};

export default Layout;
