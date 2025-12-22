import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Post } from "@/entities/post/model/types";

const postsDirectory = path.join(process.cwd(), "posts");

const getAllPosts = (): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        slug,
        tag: data.tag,
        category: data.category,
        description: data.description,
        thumbnail: data.thumbnail,
        content,
        published: data.published !== false,
      } as Post;
    })
    .filter((post) => post.published);

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export default getAllPosts;
