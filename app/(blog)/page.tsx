import type { Metadata } from "next";
import getAllPosts from "@/entities/post/api/getAllPosts";
import InfinitePostList from "@/widgets/post/ui/InfinitePostList";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bbinya1224.github.io",
  },
};

const HomePage = () => {
  const posts = getAllPosts();
  const postItems = posts.map(({ ...frontmatter }) => frontmatter);
  return <InfinitePostList posts={postItems} />;
};

export default HomePage;
