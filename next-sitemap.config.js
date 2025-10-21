/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bbinya1224.github.io",
  generateRobotsTxt: true,
  outDir: "out",
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
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
