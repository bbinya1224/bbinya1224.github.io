import { atom } from "jotai";
import { filteredPostsAtom } from "@/entities/post/atoms/postAtom";

export const POSTS_PER_PAGE = 7;

export const currentPageAtom = atom(1);

export const totalPagesAtom = atom((get) => {
  const posts = get(filteredPostsAtom);
  return Math.ceil(posts.length / POSTS_PER_PAGE);
});

export const infinitePostsAtom = atom((get) => {
  const posts = get(filteredPostsAtom);
  const currentPage = get(currentPageAtom);
  const endIndex = currentPage * POSTS_PER_PAGE;
  return posts.slice(0, endIndex);
});
