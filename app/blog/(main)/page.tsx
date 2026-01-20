import { Suspense } from "react";
import PostList from "@/widgets/post/ui/PostList";
import PostListSkeleton from "@/widgets/post/ui/skeleton/PostListSkeleton";

const MainPage = () => {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList />
    </Suspense>
  );
};

export default MainPage;
