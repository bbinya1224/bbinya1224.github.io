import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.published !== false);

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  if (!context.site) {
    throw new Error('RSS 피드 생성을 위해 astro.config.mjs에 site 옵션이 필요합니다.');
  }

  return rss({
    title: "삔야's Blog",
    description: '프론트엔드 개발자 삔야 기술 블로그',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || '',
      link: `/posts/${post.data.slug || post.id}/`,
      categories: post.data.category ? [post.data.category] : [],
    })),
  });
}
