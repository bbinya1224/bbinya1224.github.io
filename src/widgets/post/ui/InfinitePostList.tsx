"use client";

import { useEffect, useRef, useState } from "react";
import type { PostFrontmatter } from "@/entities/post/model/types";
import PostListContent from "@/widgets/post/ui/PostListContent";

type InfinitePostListProps = {
  posts: PostFrontmatter[];
  batchSize?: number;
};

const InfinitePostList = ({ posts, batchSize = 10 }: InfinitePostListProps) => {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, posts.length));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [batchSize, posts.length]);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <section className="mx-auto w-full">
      <div className="lg:[&>article:last-of-type]:border-b-0">
        <PostListContent posts={visiblePosts} />
      </div>
      {visibleCount < posts.length && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </section>
  );
};

export default InfinitePostList;
