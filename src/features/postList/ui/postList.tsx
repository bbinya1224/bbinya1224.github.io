import type { Post } from "@/entities/post/model/types";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
