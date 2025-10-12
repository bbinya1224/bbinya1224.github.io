import PostWidget from "@/widgets/postWidget/ui/PostWidget";

const PostList = () => {
  return (
    <section className="flex flex-col gap-6">
      <PostWidget />
      <PostWidget />
      <PostWidget />
      <PostWidget />
    </section>
  );
};

export default PostList;
