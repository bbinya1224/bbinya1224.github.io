import Skeleton from "react-loading-skeleton";

const SidebarSkeleton = () => {
  return (
    <article className="relative flex w-full flex-col gap-4 md:w-auto lg:max-w-72">
      <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
        <Skeleton height={20} width="80%" />
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton circle width={48} height={48} />
          <Skeleton height={16} />
          <Skeleton height={16} width="70%" />
        </div>
      </div>

      <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
        <Skeleton height={20} width="60%" />
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton height={32} />
          <Skeleton height={32} />
          <Skeleton height={32} width="80%" />
        </div>
      </div>

      <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
        <Skeleton height={20} width="50%" />
        <div className="mt-2 flex flex-wrap gap-2">
          <Skeleton width={60} height={24} />
          <Skeleton width={80} height={24} />
          <Skeleton width={70} height={24} />
          <Skeleton width={90} height={24} />
          <Skeleton width={65} height={24} />
        </div>
      </div>
    </article>
  );
};

export default SidebarSkeleton;
