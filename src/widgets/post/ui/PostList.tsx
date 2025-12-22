"use client";

import { useAtom, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  selectedCategoryAtom,
  selectedTagsAtom,
} from "@/entities/post/atoms/postAtom";
import {
  currentPageAtom,
  infinitePostsAtom,
  totalPagesAtom,
} from "@/features/pagination/model/paginationAtom";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import PostWidget from "@/widgets/post/ui/PostWidget";
import PostListSkeleton from "@/widgets/post/ui/skeleton/PostListSkeleton";

const PostList = () => {
  const searchParams = useSearchParams();
  const [posts] = useAtom(infinitePostsAtom);
  const [totalPages] = useAtom(totalPagesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [mounted, setMounted] = useState(false);
  const setCategoryAtom = useSetAtom(selectedCategoryAtom);
  const setTagsAtom = useSetAtom(selectedTagsAtom);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const observerRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore: currentPage < totalPages,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const tagsParam = searchParams.getAll("tag");

    setCategoryAtom(category);
    setTagsAtom(tagsParam.length > 0 ? tagsParam : []);
    setCurrentPage(1);
  }, [searchParams, setCategoryAtom, setTagsAtom, setCurrentPage]);

  if (!mounted) {
    return <PostListSkeleton />;
  }

  return (
    <section className="mx-auto w-full">
      <div className="space-y-8 [&>article:last-of-type]:border-b-0">
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
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
            ))}
            <div ref={observerRef} className="h-4 w-full" />
          </>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-gray-500 dark:text-gray-400">
            <p>포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostList;
