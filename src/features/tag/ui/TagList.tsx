"use client";

import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { selectedTagsAtom, tagsAtom } from "@/entities/post/atoms/postAtom";
import Badge from "@/shared/ui/Badge";

const TagList = () => {
  const [tags] = useAtom(tagsAtom);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const tagsParam = searchParams.getAll("tag");
    setSelectedTags(tagsParam.length > 0 ? tagsParam : []);
  }, [searchParams, setSelectedTags]);

  const handleTagClick = (tag: string) => {
    let newTags = [...selectedTags];

    if (newTags.includes(tag)) {
      newTags = newTags.filter((t) => t !== tag);
    } else {
      newTags.push(tag);
    }

    let url = "/";
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    if (newTags.length > 0) {
      const prefix = category ? "&" : "?";
      newTags.forEach((t, index) => {
        url += `${index === 0 ? prefix : "&"}tag=${encodeURIComponent(t)}`;
      });
    }

    router.push(url);
  };

  return (
    <>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer font-medium sm:text-sm ${
                selectedTags.includes(tag)
                  ? "bg-amber-100 font-bold text-black dark:bg-amber-300"
                  : "bg-gray-200 text-gray-800 hover:bg-amber-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-amber-300 hover:dark:text-gray-700"
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">태그가 없습니다.</p>
      )}
    </>
  );
};

export default TagList;
