import { getPosts } from '@/entities/post/model/model';
import PostList from '@/features/postList/ui/postList';

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <section>
      <h2>게시글 목록</h2>
      <PostList posts={posts} />
    </section>
  );
};

export default PostsPage;
