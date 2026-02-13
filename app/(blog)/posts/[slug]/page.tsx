import { Metadata } from "next";
import Script from "next/script";
import getAllPosts from "@/entities/post/api/getAllPosts";
import getPostBySlug from "@/entities/post/lib/getPostBySlug";
import toFrontmatter from "@/entities/post/lib/toFrontmatter";
import PostDetail from "@/widgets/post/ui/PostDetail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const PostDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;
  const relatedPosts = getAllPosts()
    .filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const scoreA = a.category === post.category ? 1 : 0;
      const scoreB = b.category === post.category ? 1 : 0;
      if (scoreA !== scoreB) return scoreB - scoreA;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 5)
    .map(toFrontmatter);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "삔야",
      url: "https://bbinya1224.github.io/about-me",
    },
    publisher: {
      "@type": "Person",
      name: "삔야",
    },
    image: post.thumbnail
      ? `https://bbinya1224.github.io${post.thumbnail}`
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bbinya1224.github.io/posts/${slug}`,
    },
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto h-full w-full max-w-4xl">
        <PostDetail post={post} relatedPosts={relatedPosts} />
      </section>
    </>
  );
};

export default PostDetailPage;

export const generateStaticParams = () => {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
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

  const url = `https://bbinya1224.github.io/posts/${slug}`;

  return {
    title: post.title,
    description: post.description || post.title,
    keywords: post.tag || [],
    authors: [{ name: "삔야" }],
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url,
      siteName: "삔야's Blog",
      type: "article",
      publishedTime: post.date,
      authors: ["삔야"],
      locale: "ko_KR",
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              alt: post.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}
