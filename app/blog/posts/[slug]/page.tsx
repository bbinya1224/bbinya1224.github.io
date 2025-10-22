import { Metadata } from "next";
import getPostBySlug from "@/entities/post/lib/getPostBySlug";
import getPostSlugs from "@/entities/post/lib/getPostSlugs";
import PostDetail from "@/widgets/post/ui/PostDetail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PostDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <section className="card-base mx-auto h-full w-full max-w-4xl shadow-xl">
      <PostDetail post={post} />
    </section>
  );
};

export default PostDetailPage;

export const generateStaticParams = () => {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description || post.title,
  };
}
