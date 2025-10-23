import { useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";
import { allPostsAtom } from "@/entities/post/atoms/postAtom";
import cn from "@/shared/utils/cn";

type CategoryItem = {
  category: string;
  onClick: () => void;
  isSelected: boolean;
};

const CategoryItem = ({ category, onClick, isSelected }: CategoryItem) => {
  const categoryCountAtom = useMemo(
    () =>
      selectAtom(
        allPostsAtom,
        (posts) => posts.filter((p) => p.category === category).length,
      ),
    [category],
  );

  const count = useAtomValue(categoryCountAtom);

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-left font-medium transition-[background]",
        isSelected
          ? "bg-amber-100 font-bold text-black dark:bg-amber-300"
          : "hover:bg-amber-100 hover:font-bold dark:hover:bg-amber-300 dark:hover:text-gray-700",
      )}
    >
      {category}
      <span className="text-sm font-normal text-gray-400">({count})</span>
    </button>
  );
};

export default CategoryItem;
