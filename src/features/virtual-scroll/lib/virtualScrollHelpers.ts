import type { Post } from "@/entities/post/model/types";

export const estimatePostHeight = (post: Post): number => {
  const TITLE_HEIGHT = 32;
  const DESCRIPTION_HEIGHT = post.description ? 72 : 0;
  const METADATA_HEIGHT = 24;
  const PADDING_Y = 64;
  const BORDER_HEIGHT = 1;

  return (
    TITLE_HEIGHT +
    DESCRIPTION_HEIGHT +
    METADATA_HEIGHT +
    PADDING_Y +
    BORDER_HEIGHT
  );
};

export const shouldLoadNextPage = (
  lastVisibleIndex: number,
  totalLoadedItems: number,
  totalPages: number,
  currentPage: number,
  threshold: number = 3
): boolean => {
  const isNearEnd = lastVisibleIndex >= totalLoadedItems - threshold;
  const hasMorePages = currentPage < totalPages;
  return isNearEnd && hasMorePages;
};
