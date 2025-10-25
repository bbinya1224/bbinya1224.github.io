import Skeleton from "react-loading-skeleton";
import ArrowIcon from "@/shared/icons/ic_arrow.svg";
import CalendarIcon from "@/shared/icons/ic_calendar.svg";
import CategoryIcon from "@/shared/icons/ic_category.svg";
import TagIcon from "@/shared/icons/ic_tag.svg";

const PostWidgetSkeleton = () => {
  return (
    <article className="card-base relative flex h-full w-full flex-row justify-between gap-4 px-6 py-6 shadow-lg sm:h-48 sm:py-4 sm:pr-2 sm:pl-7 lg:gap-0">
      <div className="flex-1">
        <div className="mb-3 w-full gap-2">
          <Skeleton width="70%" height={32} borderRadius={6} />
        </div>

        <div className="flex flex-row gap-9">
          <p className="flex flex-row items-center gap-1">
            <CalendarIcon className="size-5 text-amber-300" />
            <Skeleton width={100} height={16} borderRadius={4} />
          </p>

          <p className="flex flex-row items-center gap-1">
            <CategoryIcon className="size-5 text-amber-300" />
            <Skeleton width={80} height={16} borderRadius={4} />
          </p>

          <p className="hidden flex-row items-center gap-1 sm:flex">
            <TagIcon className="size-5 text-amber-300" />
            <Skeleton width={60} height={16} borderRadius={4} />
          </p>
        </div>

        <div className="mt-4 space-y-2 pr-4">
          <Skeleton height={16} borderRadius={4} />
          <Skeleton width="80%" height={16} borderRadius={4} />
        </div>
      </div>

      <div className="relative hidden h-full w-1/10 sm:block">
        <div className="h-full rounded-md bg-slate-100 dark:bg-[#11161b]">
          <ArrowIcon
            className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-amber-300"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
};

export default PostWidgetSkeleton;
