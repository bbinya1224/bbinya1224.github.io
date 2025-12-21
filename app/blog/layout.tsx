import type { ReactNode } from "react";
import PostListProvider from "@/app/provider/PostListProvider";
import getAllPosts from "@/entities/post/api/getAllPosts";
import Footer from "@/widgets/footer/ui/Footer";
import Header from "@/widgets/header/ui/Header";
import Nav from "@/widgets/header/ui/Nav";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const posts = getAllPosts();

  return (
    <PostListProvider initialPosts={posts}>
      <section className="relative mx-auto max-w-[var(--page-width)] px-4 pb-8 sm:px-8">
        <Header />

        <main className="mt-20 flex flex-col gap-12 lg:flex-row lg:gap-24">
          <div className="flex-1">
            <Nav />
            {children}
          </div>
          <aside className="w-full shrink-0 border-l border-[#e8e8e8] lg:w-[320px]">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </aside>
        </main>
        <Footer />
      </section>
    </PostListProvider>
  );
};

export default Layout;
