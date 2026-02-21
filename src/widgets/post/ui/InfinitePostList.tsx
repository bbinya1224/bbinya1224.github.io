"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PostFrontmatter } from "@/entities/post/model/types";
import PostListContent from "@/widgets/post/ui/PostListContent";

type InfinitePostListProps = {
  posts: PostFrontmatter[];
  batchSize?: number;
};

const InfinitePostList = ({ posts, batchSize = 10 }: InfinitePostListProps) => {
  const searchParams = useSearchParams();
  const filterKey = searchParams.toString();

  const params = new URLSearchParams(filterKey);
  const category = params.get("category");
  const tags = params.getAll("tag");

  let filteredPosts = posts;

  if (category) {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  if (tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      if (!post.tag) return false;
      const postTags = post.tag.split(",").map((t) => t.trim());
      return tags.some((tag) => postTags.includes(tag));
    });
  }

  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(batchSize);
  }, [filterKey, batchSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, filteredPosts.length));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [batchSize, filteredPosts.length]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <section className="mx-auto w-full">
      <div className="lg:[&>article:last-of-type]:border-b-0">
        <PostListContent posts={visiblePosts} />
      </div>
      {visibleCount < filteredPosts.length && (
        <div ref={sentinelRef} className="h-10" />
      )}
    </section>
  );
};

export default InfinitePostList;
