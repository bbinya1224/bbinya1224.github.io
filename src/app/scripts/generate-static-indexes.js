/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

if (!fs.existsSync(outDir)) {
  console.log("out/ directory not found, skipping.");
  process.exit(0);
}

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const copyAsDirectoryIndex = (htmlFilePath, targetDir) => {
  ensureDir(targetDir);
  fs.copyFileSync(htmlFilePath, path.join(targetDir, "index.html"));
};

const htmlFiles = fs.readdirSync(outDir).filter((file) => file.endsWith(".html"));

htmlFiles.forEach((fileName) => {
  if (fileName === "index.html" || fileName === "404.html") return;

  const fileBaseName = fileName.replace(/\.html$/, "");
  copyAsDirectoryIndex(path.join(outDir, fileName), path.join(outDir, fileBaseName));
});

const postsDir = path.join(outDir, "posts");
if (fs.existsSync(postsDir)) {
  const postHtmlFiles = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".html"));

  postHtmlFiles.forEach((fileName) => {
    const slug = fileName.replace(/\.html$/, "");
    copyAsDirectoryIndex(path.join(postsDir, fileName), path.join(postsDir, slug));
  });
}

console.log("Created slash-compatible index.html files in out/");
