"use client";

import { useHydrateAtoms } from "jotai/utils";
import { allPostsAtom } from "@/entities/post/atoms/postAtom";
import type { Post } from "@/entities/post/model/types";

type PostListProviderProps = {
  initialPosts: Post[];
  children: React.ReactNode;
};

const PostListProvider = ({
  initialPosts,
  children,
}: PostListProviderProps) => {
  useHydrateAtoms([[allPostsAtom, initialPosts]]);

  return <>{children}</>;
};

export default PostListProvider;
