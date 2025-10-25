"use client";

import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  categoriesAtom,
  selectedCategoryAtom,
} from "@/entities/post/atoms/postAtom";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  const [categories] = useAtom(categoriesAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category);
  }, [searchParams, setSelectedCategory]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      router.push("/blog");
    } else {
      const tagsParam = searchParams.getAll("tag");
      let url = `/blog?category=${encodeURIComponent(category)}`;

      tagsParam.forEach((tag) => {
        url += `&tag=${encodeURIComponent(tag)}`;
      });

      router.push(url);
    }
  };

  return (
    <>
      {categories.length > 0 ? (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <CategoryItem
              key={category}
              category={category}
              onClick={() => handleCategoryClick(category)}
              isSelected={selectedCategory === category}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">카테고리가 없습니다.</p>
      )}
    </>
  );
};

export default CategoryList;
