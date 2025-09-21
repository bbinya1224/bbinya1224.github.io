import getPostBySlug from '@/entities/post/model/getPostBySlug';
import getPostSlugs from '@/entities/post/model/getPostSlugs';
import PostWidget from '@/widgets/postWidget/ui/PostWidget';

const PostDetailPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <section>
      <PostWidget content={post.content} />
    </section>
  );
};

export default PostDetailPage;

export const generateStaticParams = async () => {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
};
