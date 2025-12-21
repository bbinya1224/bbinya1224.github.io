import Image from "next/image";
import Link from "next/link";
import { type PostFrontmatter } from "@/entities/post/model/types";
import CalendarIcon from "@/shared/icons/ic_calendar.svg";
import CategoryIcon from "@/shared/icons/ic_category.svg";
import TagIcon from "@/shared/icons/ic_tag.svg";

type PostWidgetProps = Omit<PostFrontmatter, "content">;

const PostWidget = ({
  title,
  date,
  category,
  tag,
  description,
  slug,
  thumbnail,
}: PostWidgetProps) => {
  const tags = tag?.split(",").map((t) => t.trim()) || [];

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex w-full max-w-[680px] flex-row justify-between gap-12 border-b border-gray-100 py-8 dark:border-gray-800">
      <div className="flex flex-1 flex-col justify-center">
        <Link href={`/blog/posts/${slug}`}>
          <h2 className="mb-2 text-xl font-bold break-keep text-gray-900 sm:text-2xl dark:text-gray-100">
            {title}
          </h2>
          {description && (
            <p className="mb-4 line-clamp-3 text-base text-gray-500 break-keep dark:text-gray-400">
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
         <Link href={`/blog/posts/${slug}`} className="relative hidden h-[112px] w-[112px] shrink-0 overflow-hidden sm:block">
           <Image
             src={thumbnail}
             alt={title}
             fill
             className="object-cover transition-transform duration-300 group-hover:scale-105"
             sizes="112px"
           />
         </Link>
      )}
    </article>
  );
};

export default PostWidget;
