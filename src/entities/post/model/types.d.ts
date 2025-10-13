export type PostFrontmatter = {
  title: string;
  date: string;
  slug: string;
  tag?: string;
  category?: string;
  description?: string;
};

export type Post = {
  content: string;
} & PostFrontmatter;
