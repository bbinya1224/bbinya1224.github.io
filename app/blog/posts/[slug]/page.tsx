import { Metadata } from "next";
import Script from "next/script";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "삔아",
      url: "https://bbinya1224.github.io/blog/about-me",
    },
    publisher: {
      "@type": "Person",
      name: "삔아",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bbinya1224.github.io/blog/posts/${slug}`,
    },
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="card-base mx-auto h-full w-full max-w-4xl shadow-xl">
        <PostDetail post={post} />
      </section>
    </>
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

  const url = `https://bbinya1224.github.io/blog/posts/${slug}`;

  return {
    title: post.title,
    description: post.description || post.title,
    keywords: post.tag || [],
    authors: [{ name: "삔아" }],
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url,
      siteName: "삔아's Blog",
      type: "article",
      publishedTime: post.date,
      authors: ["삔아"],
      locale: "ko_KR",
    },
    alternates: {
      canonical: url,
    },
  };
}
