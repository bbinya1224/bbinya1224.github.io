import { getPostBySlug } from '@/entities/post/model/model';
import PostWidget from '@/widgets/postWidget/ui/PostWidget';

const PostDetailPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <section>
      <PostWidget post={post} />
    </section>
  );
};

export default PostDetailPage;
