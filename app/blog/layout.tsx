import type { ReactNode } from "react";
import PostListProvider from "@/app/provider/PostListProvider";
import getAllPosts from "@/entities/post/api/getAllPosts";
import Footer from "@/widgets/footer/ui/Footer";
import Header from "@/widgets/header/ui/Header";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const posts = getAllPosts();

  return (
    <PostListProvider initialPosts={posts}>
      <section className="relative mx-auto max-w-[var(--page-width)] pb-8">
        <div className="fixed top-0 left-1/2 z-50 w-full max-w-[var(--page-width)] -translate-x-1/2">
          <div className="mx-4">
            <Header />
          </div>
        </div>
        <main className="mx-4 mt-[7rem] mb-4 flex flex-col-reverse gap-8 lg:flex-row">
          <Sidebar />
          {children}
        </main>
        <Footer />
      </section>
    </PostListProvider>
  );
};

export default Layout;
