"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GiscusComponent from "@giscus/react";

const Comment = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-8">
      <GiscusComponent
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID as string}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY as string}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID as string}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="bottom"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
};

export default Comment;
