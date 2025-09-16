import { Post } from './types';

export async function getPosts(): Promise<Post[]> {
  return [
    {
      id: '1',
      title: '첫 번째 글',
      content: '첫 번째 글 내용',
      date: '2025-09-16',
      slug: 'first-post',
    },
  ];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
