import type { MetadataRoute } from "next";
import getAllPosts from "@/entities/post/api/getAllPosts";

export const dynamic = "force-static";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = "https://bbinya1224.github.io";
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-me`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/lists`,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  return [...staticPages, ...postEntries];
};

export default sitemap;
