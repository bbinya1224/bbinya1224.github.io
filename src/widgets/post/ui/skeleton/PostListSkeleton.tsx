import PostWidgetSkeleton from "@/widgets/post/ui/skeleton/PostWidgetSkeleton";

const PostListSkeleton = () => {
  return (
    <section className="mx-auto w-full">
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostWidgetSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default PostListSkeleton;
