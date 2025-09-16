import type { Post } from '@/entities/post/model/types';

export default function PostWidget({ post }: { post: Post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <div>{post.content}</div>
    </article>
  );
}
