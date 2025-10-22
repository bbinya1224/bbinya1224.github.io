import { cache } from "react";
import getAllPosts from "@/entities/post/lib/getAllPosts";
import type { Post } from "@/entities/post/model/types";

export const getAllTags = cache((): string[] => {
  return Array.from(
    getAllPosts().reduce((acc, { tag }) => {
      if (typeof tag === "string" && tag.length > 0) {
        tag.split(",").forEach((t) => {
          const trimmed = t.trim();
          if (trimmed.length > 0) {
            acc.add(trimmed);
          }
        });
      }
      return acc;
    }, new Set<string>()),
  ).sort();
});

export const getPostsByTag = cache((tag: string): Post[] => {
  const normalizedTag = tag.trim();

  return getAllPosts().filter((post) => {
    if (typeof post.tag !== "string" || post.tag.length === 0) {
      return false;
    }

    return post.tag.split(",").some((t) => t.trim() === normalizedTag);
  });
});
