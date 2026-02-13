import type { PostFrontmatter } from "@/entities/post/model/types";
import PostListContent from "@/widgets/post/ui/PostListContent";

type ServerPostListProps = {
  posts: PostFrontmatter[];
  limit?: number;
};

const ServerPostList = ({ posts, limit }: ServerPostListProps) => {
  const visiblePosts =
    typeof limit === "number" ? posts.slice(0, limit) : posts;

  return (
    <section className="mx-auto w-full">
      <div className="lg:[&>article:last-of-type]:border-b-0">
        <PostListContent posts={visiblePosts} />
      </div>
    </section>
  );
};

export default ServerPostList;
