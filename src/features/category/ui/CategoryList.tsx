"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type CategoryProps = {
  categories: string[];
};

const CateogryList = ({ categories }: CategoryProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${category}`);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {categories.length > 0 ? (
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer rounded px-3 py-2 text-left font-medium transition-[background] ${
                selectedCategory === category
                  ? "bg-amber-100 font-bold text-black dark:bg-amber-300"
                  : "hover:bg-amber-100 hover:font-bold dark:hover:bg-amber-300 dark:hover:text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">카테고리가 없습니다.</p>
      )}
    </>
  );
};

export default CateogryList;
