import PostWidget from "@/widgets/post/ui/PostWidget";
import type { Post } from "@/entities/post/model/types";

type ServerPostListProps = {
  posts: Post[];
  limit?: number;
};

const ServerPostList = ({ posts, limit }: ServerPostListProps) => {
  const visiblePosts = typeof limit === "number" ? posts.slice(0, limit) : posts;

  return (
    <section className="mx-auto w-full">
      <div className="lg:[&>article:last-of-type]:border-b-0">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <PostWidget
              key={post.slug}
              title={post.title}
              date={post.date}
              category={post.category}
              tag={post.tag}
              description={post.description}
              slug={post.slug}
              thumbnail={post.thumbnail}
            />
          ))
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-gray-500 dark:text-gray-400">
            <p>포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServerPostList;
