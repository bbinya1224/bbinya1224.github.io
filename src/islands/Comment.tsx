import GiscusComponent from '@giscus/react';
import { useDarkMode } from '@/lib/useDarkMode';

const REPO = import.meta.env.PUBLIC_GISCUS_REPO;
const REPO_ID = import.meta.env.PUBLIC_GISCUS_REPO_ID;
const CATEGORY = import.meta.env.PUBLIC_GISCUS_CATEGORY;
const CATEGORY_ID = import.meta.env.PUBLIC_GISCUS_CATEGORY_ID;

export default function Comment() {
  const isDark = useDarkMode();
  const theme = isDark ? 'dark' : 'light';

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
