import getAllPosts from "@/entities/post/lib/getAllPosts";
import PostWidget from "@/widgets/post/ui/PostWidget";

const PostList = () => {
  const posts = getAllPosts();

  return (
    <section className="mx-auto w-full">
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostWidget
              key={post.slug}
              title={post.title}
              date={post.date}
              category={post.category}
              tag={post.tag}
              description={post.description}
              slug={post.slug}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            아직 게시글이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
};

export default PostList;
