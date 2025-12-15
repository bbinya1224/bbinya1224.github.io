import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { Project } from "@/entities/project/model/types";
import { mdxComponents } from "@/mdx-components";

const projectsDirectory = path.join(process.cwd(), "side-projects");

export const getProjects = async (): Promise<Project[]> => {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);
  const projects: Project[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;

    const filePath = path.join(projectsDirectory, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data: frontmatter } = matter(fileContent);

    const { content: compiledContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
      components: mdxComponents,
    });

    projects.push({
      id: file.replace(/\.mdx?$/, ""),
      title: frontmatter.title as string,
      description: frontmatter.description as string,
      techStack: frontmatter.techStack as string[],
      repoUrl: frontmatter.repoUrl as string,
      demoUrl: frontmatter.demoUrl as string,
      imageUrl: frontmatter.imageUrl as string,
      content: compiledContent,
    });
  }

  return projects;
};
