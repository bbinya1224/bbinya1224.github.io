import type { PostFrontmatter } from "@/entities/post/model/types";
import PostWidget from "@/widgets/post/ui/PostWidget";

type PostListContentProps = {
  posts: PostFrontmatter[];
};

const PostListContent = ({ posts }: PostListContentProps) => {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-gray-500 dark:text-gray-400">
        <p>포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
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
      ))}
    </>
  );
};

export default PostListContent;
