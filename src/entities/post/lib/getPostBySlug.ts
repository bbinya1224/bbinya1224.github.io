import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Post, PostFrontmatter } from "@/entities/post/model/types";
import { mdxComponents } from "@/mdx-components";

const postsDirectory = path.join(process.cwd(), "posts");

const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    if (frontmatter.published === false) {
      return null;
    }

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
      title: frontmatter.title,
      date: frontmatter.date,
      slug: realSlug,
      tag: frontmatter.tag,
      category: frontmatter.category,
      description: frontmatter.description,
      thumbnail: frontmatter.thumbnail,
      content: compiledContent,
      published: true,
    };
  } catch (e) {
    console.log(`Error fetching post with slug "${slug}":`, e);
    return null;
  }
};

export default getPostBySlug;
