import Image from "next/image";
import Link from "next/link";
import { type PostFrontmatter } from "@/entities/post/model/types";

type PostWidgetProps = Omit<PostFrontmatter, "content">;

const PostWidget = ({
  title,
  date,
  category,
  description,
  slug,
  thumbnail,
}: PostWidgetProps) => {
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex w-full flex-row justify-between gap-4 border-b border-gray-100 py-8 lg:max-w-[680px] dark:border-gray-800">
      <div className="flex flex-1 flex-col justify-center">
        <Link href={`/posts/${slug}`}>
          <h2 className="mb-2 text-xl font-bold break-keep text-gray-900 transition-colors group-hover:text-amber-400 sm:text-2xl dark:text-gray-100 dark:group-hover:text-amber-400">
            {title}
          </h2>
          {description && (
            <p className="mb-4 line-clamp-3 text-base break-keep text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </Link>

        <div className="flex flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{formattedDate}</span>
          {category && (
            <>
              <span>·</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {category}
              </span>
            </>
          )}
        </div>
      </div>

      {thumbnail && (
        <Link
          href={`/posts/${slug}`}
          className="relative hidden h-[166px] w-[160px] shrink-0 overflow-hidden sm:block"
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-contain"
            sizes="112px"
          />
        </Link>
      )}
    </article>
  );
};

export default PostWidget;
