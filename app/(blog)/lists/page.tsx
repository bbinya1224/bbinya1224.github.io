import type { Metadata } from "next";
import getAllPosts from "@/entities/post/api/getAllPosts";
import CategoryCollection from "@/widgets/category-collection/ui/CategoryCollection";
import ServerPostList from "@/widgets/post/ui/ServerPostList";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bbinya1224.github.io/lists",
  },
};

export default function ListsPage() {
  const posts = getAllPosts();

  return (
    <section className="w-full">
      <CategoryCollection />
      <div className="mt-10">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          최신 글
        </h2>
        <ServerPostList posts={posts} limit={10} />
      </div>
    </section>
  );
}
