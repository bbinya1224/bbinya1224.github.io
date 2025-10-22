import fs from "fs";
import path from "path";
import matter from "gray-matter";
import RSS from "rss";

const site_url = "https://bbinya1224.github.io";
const postsDirectory = path.join(process.cwd(), "posts");

function generateRSSFeed() {
  const feed = new RSS({
    title: "삔아's Blog",
    description: "프론트엔드 개발자 삔아의 기술 블로그",
    site_url,
    feed_url: `${site_url}/rss.xml`,
    language: "ko",
  });

  const files = fs.readdirSync(postsDirectory);

  files.forEach((file) => {
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    if (data.slug && data.title) {
      feed.item({
        title: data.title,
        url: `${site_url}/blog/posts/${data.slug}`,
        date: data.date,
        description: data.description || "",
      });
    }
  });

  const xml = feed.xml({ indent: true });
  fs.writeFileSync(path.join(process.cwd(), "public/rss.xml"), xml);
  console.log("RSS feed generated!");
}

generateRSSFeed();
