import Skeleton from "react-loading-skeleton";

const PostWidgetSkeleton = () => {
  return (
    <article className="card-base relative flex h-full w-full flex-row justify-between gap-4 px-6 py-6 shadow-lg sm:h-48 sm:py-4 sm:pr-2 sm:pl-7 lg:gap-0">
      <div className="flex-1">
        <div className="mb-3 w-full gap-2">
          <Skeleton width="70%" height={32} borderRadius={6} />
        </div>

        <div className="flex flex-row gap-9">
          <p className="flex flex-row items-center gap-1">
            <Skeleton width={120} height={16} borderRadius={4} />
          </p>

          <p className="flex flex-row items-center gap-1">
            <Skeleton width={100} height={16} borderRadius={4} />
          </p>

          <p className="hidden flex-row items-center gap-1 sm:flex">
            <Skeleton width={80} height={16} borderRadius={4} />
          </p>
        </div>

        <div className="mt-4 space-y-2 pr-4">
          <Skeleton height={16} borderRadius={4} />
          <Skeleton width="80%" height={16} borderRadius={4} />
        </div>
      </div>
    </article>
  );
};

export default PostWidgetSkeleton;
