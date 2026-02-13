import type { Post, PostFrontmatter } from "@/entities/post/model/types";

const toFrontmatter = (post: Post): PostFrontmatter => ({
  title: post.title,
  date: post.date,
  slug: post.slug,
  tag: post.tag,
  category: post.category,
  description: post.description,
  thumbnail: post.thumbnail,
  published: post.published,
});

export default toFrontmatter;
