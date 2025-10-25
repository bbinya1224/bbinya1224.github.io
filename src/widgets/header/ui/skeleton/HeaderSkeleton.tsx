import Skeleton from "react-loading-skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="h-[4.5rem] max-w-[var(--page-width)] rounded-2xl rounded-t-none bg-white px-8 py-2 text-black shadow-lg dark:bg-gray-900 dark:text-white">
      <div className="relative top-1/2 mx-auto flex -translate-y-1/2 items-center justify-between">
        <div className="rounded-full px-4 py-[10px]">
          <Skeleton circle width={24} height={24} />
        </div>

        <div className="flex flex-row gap-4">
          <div>
            <Skeleton width={80} height={24} />
          </div>

          <div className="rounded-full px-4 py-[10px]">
            <Skeleton circle width={24} height={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
