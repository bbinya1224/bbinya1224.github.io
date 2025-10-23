import PostListProvider from "@/app/provider/PostListProvider";
import getAllPosts from "@/entities/post/api/getAllPosts";
import PostList from "@/widgets/post/ui/PostList";

const MainPage = async () => {
  const posts = getAllPosts();

  return (
    <PostListProvider initialPosts={posts}>
      <PostList />
    </PostListProvider>
  );
};

export default MainPage;
