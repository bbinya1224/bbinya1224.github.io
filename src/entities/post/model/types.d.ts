import type { ReactNode } from "react";

export type PostFrontmatter = {
  title: string;
  date: string;
  slug: string;
  tag?: string;
  category?: string;
  description?: string;
};

export type Post = {
  content: ReactNode;
} & PostFrontmatter;

export type PostFilter = {
  tags?: string[] | string | null;
  category?: string | null;
};
