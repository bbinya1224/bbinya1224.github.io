import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { filteredPostsAtom } from "@/entities/post/atoms/postAtom";

export const POSTS_PER_PAGE = 7;

export const currentPageAtom = atomWithHash("page", 1);

export const totalPagesAtom = atom((get) => {
  const posts = get(filteredPostsAtom);
  return Math.ceil(posts.length / POSTS_PER_PAGE);
});

export const paginatedPostsAtom = atom((get) => {
  const posts = get(filteredPostsAtom);
  const currentPage = get(currentPageAtom);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  return posts.slice(startIndex, endIndex);
});
