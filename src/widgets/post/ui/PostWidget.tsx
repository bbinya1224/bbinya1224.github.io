import { type PostFrontmatter } from "@/entities/post/model/types";
import ArrowIcon from "@/shared/icons/ic_arrow.svg";
import CalendarIcon from "@/shared/icons/ic_calendar.svg";
import CategoryIcon from "@/shared/icons/ic_category.svg";
import TagIcon from "@/shared/icons/ic_tag.svg";
import Link from "next/link";

type PostWidgetProps = Omit<PostFrontmatter, "content">;

const PostWidget = ({
  title,
  date,
  category,
  tag,
  description,
  slug,
}: PostWidgetProps) => {
  const tags = tag?.split(",").map((t) => t.trim()) || [];

  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="card-base relative flex h-48 w-full flex-row justify-between px-6 py-6 shadow-lg md:py-4 md:pr-2 md:pl-9">
      <div className="flex-1">
        <Link href={`/blog/posts/${slug}`}>
          <h2 className="group mb-3 flex w-full cursor-pointer items-center gap-2 text-3xl font-bold transition before:absolute before:top-[26px] before:hidden before:h-5 before:w-1 before:rounded-md before:bg-amber-300 hover:text-amber-400 before:md:left-[18px] md:before:block dark:hover:text-amber-400">
            {title}
            <ArrowIcon
              className="mt-1 size-6 -translate-x-2 text-amber-300 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:opacity-0"
              aria-hidden="true"
            />
          </h2>
        </Link>

        <div className="flex flex-row gap-9">
          <p className="flex flex-row items-center gap-1">
            <CalendarIcon className="size-5 text-amber-300 dark:text-amber-300" />
            <span className="text-sm">{formattedDate}</span>
          </p>

          {category && (
            <p className="flex flex-row items-center gap-1">
              <CategoryIcon className="size-5 text-amber-300 dark:text-amber-300" />
              <span className="text-sm">{category}</span>
            </p>
          )}

          {tags.length > 0 && (
            <p className="hidden flex-row items-center gap-1 md:flex">
              <TagIcon className="size-5 text-amber-300 dark:text-amber-300" />
              <span className="text-sm">{tags.join(", ")}</span>
            </p>
          )}
        </div>

        {description && (
          <div className="mt-4">
            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        )}
      </div>

      <div className="relative hidden h-full w-1/10 md:block">
        <Link href={`/blog/posts/${slug}`}>
          <div className="h-full rounded-md bg-slate-100 transition-all duration-200 hover:bg-slate-200 dark:bg-[#11161b] dark:hover:bg-[#222933]">
            <ArrowIcon
              className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-amber-300"
              aria-hidden="true"
            />
          </div>
        </Link>
      </div>
    </article>
  );
};

export default PostWidget;
