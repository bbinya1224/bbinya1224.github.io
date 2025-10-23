import { Suspense } from "react";
import PostList from "@/widgets/post/ui/PostList";

const MainPage = async () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostList />
    </Suspense>
  );
};

export default MainPage;
