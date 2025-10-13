import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

const getPostBySlug = (slug: string): Post => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    slug: realSlug,
    tag: data.tag,
    category: data.category,
    description: data.description,
    content,
  };
};

export default getPostBySlug;
