"use client";

import { useAtom, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  filteredPostsAtom,
  selectedCategoryAtom,
  selectedTagsAtom,
} from "@/entities/post/atoms/postAtom";
import PostWidget from "@/widgets/post/ui/PostWidget";

const PostList = () => {
  const searchParams = useSearchParams();
  const [posts] = useAtom(filteredPostsAtom);
  const setCategoryAtom = useSetAtom(selectedCategoryAtom);
  const setTagsAtom = useSetAtom(selectedTagsAtom);

  useEffect(() => {
    const category = searchParams.get("category");
    const tagsParam = searchParams.getAll("tag");

    setCategoryAtom(category);
    setTagsAtom(tagsParam.length > 0 ? tagsParam : []);
  }, [searchParams, setCategoryAtom, setTagsAtom]);

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
