import toFrontmatter from "@/entities/post/lib/toFrontmatter";
import type { Post, PostFrontmatter } from "@/entities/post/model/types";

type GetRelatedPostsParams = {
  currentPost: Post;
  posts: Post[];
  max?: number;
};

const parseTags = (tag?: string) =>
  (tag ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const sortByLatest = (a: Post, b: Post) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const uniqBySlug = (posts: Post[]) => {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });
};

const getRelatedPosts = ({
  currentPost,
  posts,
  max = 5,
}: GetRelatedPostsParams): PostFrontmatter[] => {
  const candidates = posts.filter((post) => post.slug !== currentPost.slug);
  const currentTags = new Set(parseTags(currentPost.tag));

  const tagMatched = candidates
    .map((post) => {
      const overlap = parseTags(post.tag).filter((tag) =>
        currentTags.has(tag),
      ).length;
      return { post, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (a.overlap !== b.overlap) return b.overlap - a.overlap;
      return sortByLatest(a.post, b.post);
    })
    .map(({ post }) => post);

  const sameCategory = candidates
    .filter((post) => post.category === currentPost.category)
    .sort(sortByLatest);

  const latest = [...candidates].sort(sortByLatest);

  const ordered = currentTags.size
    ? uniqBySlug([...tagMatched, ...sameCategory, ...latest])
    : latest;

  return ordered.slice(0, max).map(toFrontmatter);
};

export default getRelatedPosts;
