import { getCollection } from 'astro:content';

export const POSTS_PER_PAGE = 9;

export async function getSortedPosts() {
  const allPosts = await getCollection('blog', ({ data }) => data.published !== false);
  return allPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

export function toPostData(post: Awaited<ReturnType<typeof getSortedPosts>>[number]) {
  return {
    title: post.data.title,
    date: post.data.date instanceof Date ? post.data.date : new Date(post.data.date),
    slug: post.data.slug || post.id,
    category: post.data.category,
    description: post.data.description,
  };
}

export const parseTags = (tag?: string): string[] =>
  (tag ?? '').split(',').map((t) => t.trim()).filter(Boolean);
