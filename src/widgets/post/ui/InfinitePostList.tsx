"use client";

import { useEffect, useRef, useState } from "react";
import type { PostFrontmatter } from "@/entities/post/model/types";
import PostWidget from "@/widgets/post/ui/PostWidget";

type InfinitePostListProps = {
  posts: PostFrontmatter[];
  batchSize?: number;
};

const InfinitePostList = ({
  posts,
  batchSize = 10,
}: InfinitePostListProps) => {
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
  }, [visibleCount, batchSize, posts.length]);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <section className="mx-auto w-full">
      <div className="lg:[&>article:last-of-type]:border-b-0">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <PostWidget
              key={post.slug}
              title={post.title}
              date={post.date}
              category={post.category}
              tag={post.tag}
              description={post.description}
              slug={post.slug}
              thumbnail={post.thumbnail}
            />
          ))
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-gray-500 dark:text-gray-400">
            <p>포스트가 없습니다.</p>
          </div>
        )}
      </div>
      {visibleCount < posts.length && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </section>
  );
};

export default InfinitePostList;
