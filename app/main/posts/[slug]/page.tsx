import getPostBySlug from "@/entities/post/model/getPostBySlug";
import getPostSlugs from "@/entities/post/model/getPostSlugs";
import PostWidget from "@/widgets/postWidget/ui/PostWidget2";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PostDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
