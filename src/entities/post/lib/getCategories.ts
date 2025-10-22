import { cache } from "react";
import getAllPosts from "@/entities/post/lib/getAllPosts";
import type { Post } from "@/entities/post/model/types";

export const getAllCategories = cache((): string[] => {
  const categories = getAllPosts().reduce((acc, { category }) => {
    if (typeof category === "string" && category.length > 0) {
      acc.add(category);
    }
    return acc;
  }, new Set<string>());

  return Array.from(categories).sort();
});

export const getPostsByCategory = cache((category: string): Post[] => {
  return getAllPosts().filter((post) => post.category === category);
});
