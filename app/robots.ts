import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/exclude"],
  },
  sitemap: "https://bbinya1224.github.io/sitemap.xml",
});

export default robots;
