import { useEffect, useState } from 'react';
import GiscusComponent from '@giscus/react';

export default function Comment() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8">
      <GiscusComponent
        repo={(import.meta.env.PUBLIC_GISCUS_REPO || 'bbinya1224/bbinya1224.github.io') as `${string}/${string}`}
        repoId={import.meta.env.PUBLIC_GISCUS_REPO_ID || ''}
        category={import.meta.env.PUBLIC_GISCUS_CATEGORY || ''}
        categoryId={import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || ''}
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
