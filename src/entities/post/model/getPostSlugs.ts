import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostSlugs = () => {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
};

export default getPostSlugs;
