import type { Metadata } from "next";
import getAllPosts from "@/entities/post/api/getAllPosts";
import toFrontmatter from "@/entities/post/lib/toFrontmatter";
import InfinitePostList from "@/widgets/post/ui/InfinitePostList";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bbinya1224.github.io",
  },
};

const HomePage = () => {
  const posts = getAllPosts();
  return <InfinitePostList posts={posts.map(toFrontmatter)} />;
};

export default HomePage;
