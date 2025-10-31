import Skeleton from "react-loading-skeleton";

const TagSkeleton = () => {
  return (
    <div className="inline-flex flex-row flex-wrap gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} width="60px" height={16} borderRadius={4} />
      ))}
    </div>
  );
};

export default TagSkeleton;
