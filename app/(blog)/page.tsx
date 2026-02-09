import type { Metadata } from "next";
import { Suspense } from "react";
import PostList from "@/widgets/post/ui/PostList";
import PostListSkeleton from "@/widgets/post/ui/skeleton/PostListSkeleton";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bbinya1224.github.io",
  },
};

const HomePage = () => {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList />
    </Suspense>
  );
};

export default HomePage;
