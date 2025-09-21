import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from './types';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPosts = async (): Promise<Post[]> => {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'));

  return files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);

    return {
      id: file.replace(/\.mdx$/, ''),
      title: data.title,
      date: data.date,
      slug: data.slug,
      content: '',
    };
  });
};

export default getPosts;
