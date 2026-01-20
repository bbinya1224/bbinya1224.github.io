"use client";

import { useAtom, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { InView } from "react-intersection-observer";
import {
  selectedCategoryAtom,
  selectedTagsAtom,
} from "@/entities/post/atoms/postAtom";
import {
  currentPageAtom,
  infinitePostsAtom,
  totalPagesAtom,
} from "@/features/pagination/model/paginationAtom";
import PostWidget from "@/widgets/post/ui/PostWidget";

const PostList = () => {
  const searchParams = useSearchParams();
  const [posts] = useAtom(infinitePostsAtom);
  const [totalPages] = useAtom(totalPagesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const setCategoryAtom = useSetAtom(selectedCategoryAtom);
  const setTagsAtom = useSetAtom(selectedTagsAtom);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const tagsParam = searchParams.getAll("tag");

    setCategoryAtom(category);
    setTagsAtom(tagsParam.length > 0 ? tagsParam : []);
    setCurrentPage(1);
  }, [searchParams, setCategoryAtom, setTagsAtom, setCurrentPage]);

  return (
    <section className="mx-auto w-full">
      <div className="lg:[&>article:last-of-type]:border-b-0">
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
            {currentPage < totalPages && (
              <InView
                as="div"
                className="h-4 w-full"
                onChange={(inView) => {
                  if (inView) {
                    loadMore();
                  }
                }}
              />
            )}
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
