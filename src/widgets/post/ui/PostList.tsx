"use client";

import { useAtom, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  filteredPostsAtom,
  selectedCategoryAtom,
  selectedTagsAtom,
} from "@/entities/post/atoms/postAtom";
import PostWidget from "@/widgets/post/ui/PostWidget";
import PostListSkeleton from "@/widgets/post/ui/skeleton/PostListSkeleton";

const PostList = () => {
  const searchParams = useSearchParams();
  const [posts] = useAtom(filteredPostsAtom);
  const [mounted, setMounted] = useState(false);
  const setCategoryAtom = useSetAtom(selectedCategoryAtom);
  const setTagsAtom = useSetAtom(selectedTagsAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const tagsParam = searchParams.getAll("tag");

    setCategoryAtom(category);
    setTagsAtom(tagsParam.length > 0 ? tagsParam : []);
  }, [searchParams, setCategoryAtom, setTagsAtom]);

  if (!mounted) {
    return <PostListSkeleton />;
  }

  return (
    <section className="mx-auto w-full">
      <div className="space-y-6">
        {posts.map((post) => (
          <PostWidget
            key={post.slug}
            title={post.title}
            date={post.date}
            category={post.category}
            tag={post.tag}
            description={post.description}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default PostList;
