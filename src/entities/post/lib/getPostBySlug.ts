import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Post } from "@/entities/post/model/types";
import { mdxComponents } from "@/mdx-components";

const postsDirectory = path.join(process.cwd(), "posts");

const getPostBySlug = async (slug: string): Promise<Post> => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        development: process.env.NODE_ENV === "development",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return {
    title: data.title,
    date: data.date,
    slug: realSlug,
    tag: data.tag,
    category: data.category,
    description: data.description,
    content: compiledContent,
  };
};

export default getPostBySlug;
