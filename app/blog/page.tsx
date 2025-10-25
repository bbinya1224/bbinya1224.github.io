import { Suspense } from "react";
import PostList from "@/widgets/post/ui/PostList";
import PostWidgetSkeleton from "@/widgets/post/ui/skeleton/PostWidgetSkeleton";

const MainPage = () => {
  return (
    <Suspense fallback={<PostWidgetSkeleton />}>
      <PostList />
    </Suspense>
  );
};

export default MainPage;
