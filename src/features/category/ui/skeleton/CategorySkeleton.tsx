import Skeleton from "react-loading-skeleton";

const CategorySkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} width="80%" height={20} borderRadius={4} />
      ))}
    </div>
  );
};

export default CategorySkeleton;
