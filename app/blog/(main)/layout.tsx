import { type ReactNode, Suspense } from "react";
import PostListProvider from "@/app/provider/PostListProvider";
import getAllPosts from "@/entities/post/api/getAllPosts";
import Nav from "@/widgets/header/ui/Nav";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const posts = getAllPosts();

  return (
    <PostListProvider initialPosts={posts}>
      <main className="flex flex-col gap-6 lg:flex-row lg:gap-24">
        <div className="flex-1">
          <Suspense fallback={<div className="h-10" />}>
            <Nav />
          </Suspense>
          {children}
        </div>
        <aside className="w-full shrink-0 border-gray-100 lg:w-[320px] lg:border-l dark:border-gray-800">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>
      </main>
    </PostListProvider>
  );
};

export default Layout;
