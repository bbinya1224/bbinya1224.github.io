"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import {
  tagCountAtom,
  totalPostsCountAtom,
} from "@/entities/post/atoms/postAtom";

type SidebarCardHeaderProps = {
  contentType: "Category" | "Tag";
};

const SidebarCardHeader = ({ contentType }: SidebarCardHeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const totalPostCount = useAtomValue(totalPostsCountAtom);
  const totalTagCount = useAtomValue(tagCountAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <h2 className="inline-flex items-center text-2xl font-bold before:absolute before:top-[22px] before:left-[15px] before:h-6 before:w-1 before:rounded-md before:bg-amber-300 sm:pl-2">
      {contentType}

      <span className="ml-2 text-base font-normal text-gray-500">
        (
        {mounted
          ? contentType === "Category"
            ? totalPostCount
            : totalTagCount
          : 0}
        )
      </span>
    </h2>
  );
};

export default SidebarCardHeader;
