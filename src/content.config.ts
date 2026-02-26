import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './posts',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
    category: z.string().optional(),
    tag: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './side-projects' }),
  schema: z.object({
    title: z.string(),
    period: z.string().optional(),
    description: z.string(),
    techStack: z.array(z.string()).default([]),
    repoUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
});

export const collections = { blog, projects };
