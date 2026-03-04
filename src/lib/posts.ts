import { getCollection } from 'astro:content';

export const POSTS_PER_PAGE = 9;

export async function getSortedPosts() {
  const allPosts = await getCollection('blog', ({ data }) => data.published !== false);
  return allPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

type Post = Awaited<ReturnType<typeof getSortedPosts>>[number];

export const resolveSlug = (post: Post) => post.data.slug || post.id;

export function toPostData(post: Post) {
  return {
    title: post.data.title,
    date: post.data.date instanceof Date ? post.data.date : new Date(post.data.date),
    slug: resolveSlug(post),
    category: post.data.category,
    description: post.data.description,
  };
}

export const parseTags = (tag?: string): string[] =>
  (tag ?? '').split(',').map((t) => t.trim()).filter(Boolean);

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

export function computeRelatedPosts(post: Post, allPosts: Post[], limit: number): Post[] {
  const tags = parseTags(post.data.tag);
  const currentTags = new Set(tags);
  const candidates = allPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const tagMatched = candidates
    .map((p) => ({
      post: p,
      overlap: parseTags(p.data.tag).filter((t) => currentTags.has(t)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map(({ post }) => post);

  const sameCategory = candidates.filter((p) => p.data.category === post.data.category);

  const seen = new Set<string>();
  return (currentTags.size > 0
    ? [...tagMatched, ...sameCategory, ...candidates]
    : candidates
  ).filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  }).slice(0, limit);
}
