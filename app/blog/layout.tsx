import type { ReactNode } from "react";
import PostListProvider from "@/app/provider/PostListProvider";
import getAllPosts from "@/entities/post/api/getAllPosts";
import Header from "@/widgets/header/ui/Header";
import Nav from "@/widgets/header/ui/Nav";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const posts = getAllPosts();

  return (
    <PostListProvider initialPosts={posts}>
      <section className="relative mx-auto max-w-[var(--page-width)] px-4 pb-8 sm:px-8">
        <Header />

        <main className="mt-16 flex flex-col gap-6 lg:flex-row lg:gap-24">
          <div className="flex-1">
            <Nav />
            {children}
          </div>
          <aside className="w-full shrink-0 border-gray-100 lg:w-[320px] lg:border-l dark:border-gray-800">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </aside>
        </main>
      </section>
    </PostListProvider>
  );
};

export default Layout;
