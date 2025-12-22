import { atom } from "jotai";
import type { Post } from "@/entities/post/model/types";

export const allPostsAtom = atom<Post[]>([]);

export const totalPostsCountAtom = atom((get) => {
  const posts = get(allPostsAtom);
  return posts.length;
});

export const categoriesAtom = atom((get) => {
  const posts = get(allPostsAtom);
  const categories = posts.reduce((acc, { category }) => {
    if (typeof category === "string" && category.length > 0) {
      acc.add(category);
    }
    return acc;
  }, new Set<string>());

  return Array.from(categories).sort();
});

export const categoriesWithCountAtom = atom((get) => {
  const posts = get(allPostsAtom);
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.category) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
});

export const tagsAtom = atom((get) => {
  const posts = get(allPostsAtom);
  const tags = posts.reduce((acc, { tag }) => {
    if (typeof tag === "string" && tag.length > 0) {
      tag.split(",").forEach((t) => {
        const trimmed = t.trim();
        if (trimmed.length > 0) {
          acc.add(trimmed);
        }
      });
    }
    return acc;
  }, new Set<string>());

  return Array.from(tags).sort();
});

export const tagCountAtom = atom((get) => {
  const tags = get(tagsAtom);
  return tags.length;
});

export const selectedCategoryAtom = atom<string | null>(null);
export const selectedTagsAtom = atom<string[]>([]);

export const filteredPostsAtom = atom((get) => {
  const allPosts = get(allPostsAtom);
  const category = get(selectedCategoryAtom);
  const tags = get(selectedTagsAtom);

  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : [];

  if (category && tagsArray.length > 0) {
    const categoryPosts = allPosts.filter((post) => post.category === category);

    return categoryPosts.filter((post) => {
      if (!post.tag) return false;
      const postTags = post.tag.split(",").map((t) => t.trim());
      return tagsArray.some((tag) => postTags.includes(tag.trim()));
    });
  }

  if (category) {
    return allPosts.filter((post) => post.category === category);
  }

  if (tagsArray.length > 0) {
    return allPosts.filter((post) => {
      if (!post.tag) return false;
      const postTags = post.tag.split(",").map((t) => t.trim());
      return tagsArray.some((tag) => postTags.includes(tag.trim()));
    });
  }

  return allPosts;
});
