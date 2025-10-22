"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Badge from "@/shared/ui/Badge";

type TagProps = {
  tags: string[];
};

const TagList = ({ tags }: TagProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      // 같은 태그 클릭 시 필터 제거
      router.push("/blog");
    } else {
      // 새로운 태그 선택
      router.push(`/blog?tag=${tag}`);
    }
  };

  if (!mounted) {
    return null; // Hydration mismatch 방지
  }

  return (
    <>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer font-medium sm:text-sm ${
                selectedTag === tag
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
