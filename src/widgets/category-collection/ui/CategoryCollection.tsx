"use client";

import { useAtomValue } from "jotai";
import { categoriesWithCountAtom } from "@/entities/post/atoms/postAtom";
import CategoryCard from "@/widgets/category-collection/ui/CategoryCard";

const CategoryCollection = () => {
  const categories = useAtomValue(categoriesWithCountAtom);

  if (categories.length === 0) {
    return (
      <div className="flex h-60 w-full items-center justify-center text-gray-500">
        <p>카테고리가 없습니다.</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="mt-8 grid grid-cols-1 gap-6">
        {categories.map(({ name, count }) => (
          <CategoryCard key={name} category={name} count={count} />
        ))}
      </div>
    </section>
  );
};

export default CategoryCollection;
