import { useEffect, useState } from 'react';
import GiscusComponent from '@giscus/react';

const REPO = import.meta.env.PUBLIC_GISCUS_REPO;
const REPO_ID = import.meta.env.PUBLIC_GISCUS_REPO_ID;
const CATEGORY = import.meta.env.PUBLIC_GISCUS_CATEGORY;
const CATEGORY_ID = import.meta.env.PUBLIC_GISCUS_CATEGORY_ID;

const resolveTheme = (isDark: boolean): 'light' | 'dark' => (isDark ? 'dark' : 'light');
const isDarkMode = (root: Element) => root.classList.contains('dark');
const readDocumentTheme = () => resolveTheme(isDarkMode(document.documentElement));

export default function Comment() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document === 'undefined' ? 'light' : readDocumentTheme(),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readDocumentTheme()));

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (!REPO || !REPO_ID || !CATEGORY || !CATEGORY_ID) {
    return null;
  }

  return (
    <div className="mt-8">
      <GiscusComponent
        repo={REPO as `${string}/${string}`}
        repoId={REPO_ID}
        category={CATEGORY}
        categoryId={CATEGORY_ID}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="bottom"
        theme={theme}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
