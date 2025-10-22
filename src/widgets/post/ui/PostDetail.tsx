import { type Post } from "@/entities/post/model/types";
import CalendarIcon from "@/shared/icons/ic_calendar.svg";
import CategoryIcon from "@/shared/icons/ic_category.svg";
import TagIcon from "@/shared/icons/ic_tag.svg";

type PostDetailProps = {
  post: Post;
};

const PostDetail = ({ post }: PostDetailProps) => {
  const tags = post.tag?.split(",").map((t) => t.trim()) || [];
  const formattedDate = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative p-8">
      <header className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
        <h1 className="relative mb-4 cursor-default text-5xl font-bold before:absolute before:top-[12px] before:left-[-10px] before:block before:h-7 before:w-1 before:rounded-md before:bg-amber-300 md:text-4xl before:md:top-[13px] before:md:h-5">
          {post.title}
        </h1>

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
    </article>
  );
};

export default PostDetail;
