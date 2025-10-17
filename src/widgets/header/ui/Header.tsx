"use client";

import Link from "next/link";
import DarkModeIcon from "@/widgets/header/icons/ic_darkMode.svg";
import LightModeIcon from "@/widgets/header/icons/ic_lightMode.svg";
import HomeIcon from "@/widgets/header/icons/ic_home.svg";

import { useEffect, useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="dark:bg-primary relative mx-4 h-[4.5rem] rounded-2xl rounded-t-none bg-white px-8 py-2 text-black shadow-lg dark:text-white">
      <div className="relative top-1/2 mx-auto flex -translate-y-1/2 items-center justify-between">
        <div className="rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]">
          <Link href="/blog">
            <HomeIcon className="size-[24px]" />
          </Link>
        </div>

        <div className="flex flex-row">
          <div className="rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]"></div>

          <button
            className="cursor-pointer rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]"
            onClick={() => setIsDark((prev) => !prev)}
          >
            {isDark ? (
              <LightModeIcon className="size-[24px]" />
            ) : (
              <DarkModeIcon className="size-[24px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
