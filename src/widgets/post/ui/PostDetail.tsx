import Link from "next/link";
import { type Post, type PostFrontmatter } from "@/entities/post/model/types";
import Comment from "@/features/comment/ui/Comment";
import CalendarIcon from "@/shared/icons/ic_calendar.svg";
import CategoryIcon from "@/shared/icons/ic_category.svg";
import TagIcon from "@/shared/icons/ic_tag.svg";

type PostDetailProps = {
  post: Post;
  relatedPosts: PostFrontmatter[];
};

const PostDetail = ({ post, relatedPosts }: PostDetailProps) => {
  const tags = post.tag?.split(",").map((t) => t.trim()) || [];
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative p-4 sm:p-8">
      <header className="mb-6 border-b border-gray-200 pb-4 sm:mb-8 sm:pb-6 dark:border-gray-700">
        <h1 className="relative mb-2 cursor-default text-3xl font-bold before:absolute sm:mb-4 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="mb-2 text-lg text-gray-400">{post.description}</p>
        )}

        <div className="flex cursor-default flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <CalendarIcon className="size-5 text-amber-300" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          {post.category && (
            <div className="flex cursor-default items-center gap-1">
              <CategoryIcon className="size-5 text-amber-300" />
              <span>{post.category}</span>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex cursor-default items-center gap-1">
              <TagIcon className="size-5 text-amber-300" />
              <span>{tags.join(", ")}</span>
            </div>
          )}
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">{post.content}</div>

      {relatedPosts.length > 0 && (
        <section className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            관련 글
          </h2>
          <ul className="space-y-3">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/posts/${related.slug}`}
                  className="text-base text-gray-700 hover:text-amber-500 dark:text-gray-300 dark:hover:text-amber-400"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Comment />
    </article>
  );
};

export default PostDetail;
