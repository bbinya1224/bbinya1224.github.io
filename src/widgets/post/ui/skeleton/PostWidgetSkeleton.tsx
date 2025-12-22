import Skeleton from "react-loading-skeleton";

const PostWidgetSkeleton = () => {
  return (
    <article className="flex w-full flex-row justify-between gap-1 border-b border-gray-100 py-8 lg:max-w-[680px] dark:border-gray-800">
      <div className="flex flex-1 flex-col justify-center pr-4">
        {/* Title */}
        <div className="mb-2">
          <Skeleton width="60%" height={32} />
        </div>
        
        {/* Description */}
        <div className="mb-4 space-y-2">
          <Skeleton count={2} height={20} />
        </div>

        {/* Date / Metadata */}
        <div className="flex gap-2">
          <Skeleton width={100} height={16} />
          <Skeleton width={60} height={16} />
        </div>
      </div>

      {/* Thumbnail Placeholder */}
      <div className="hidden h-[112px] w-[112px] shrink-0 sm:block">
        <Skeleton height={112} width={112} borderRadius={8} />
      </div>
    </article>
  );
};

export default PostWidgetSkeleton;
