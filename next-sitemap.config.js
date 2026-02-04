/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bbinya1224.github.io",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "out",
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  transform: async (config, path) => {
    // 메인 페이지와 about-me는 높은 우선순위
    if (path === "/" || path === "/about-me") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }
    // 블로그 포스트는 중간 우선순위
    if (path.startsWith("/posts/")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }
    // 나머지 페이지
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/exclude"],
      },
    ],
  },
};
