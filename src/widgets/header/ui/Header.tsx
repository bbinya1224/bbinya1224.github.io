"use client";

import Link from "next/link";
import DarkModeIcon from "@/widgets/header/icons/ic_darkMode.svg";
import LightModeIcon from "@/widgets/header/icons/ic_lightMode.svg";
import HomeIcon from "@/widgets/header/icons/ic_home.svg";
import MenuIcon from "@/widgets/header/icons/ic_menu.svg";

import { useEffect, useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href="/">
            <HomeIcon className="size-[24px]" />
          </Link>
        </div>

        <ul className="hidden gap-1 md:flex md:gap-6 lg:gap-8">
          <li className="rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]">
            <Link href="/">
              <h1 className="text-base font-bold">Blog</h1>
            </Link>
          </li>
          <li className="rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]">
            <Link href="/">
              <h1 className="text-base font-bold">About Me</h1>
            </Link>
          </li>
          <li className="rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]">
            <Link href="/">
              <h1 className="text-base font-bold">GitHub</h1>
            </Link>
          </li>
        </ul>

        <div className="flex flex-row">
          <div
            onClick={() => setMenuOpen((prev) => !prev)}
            className="cursor-poninter rounded-full px-4 py-[10px] hover:bg-slate-100 md:hidden dark:hover:bg-[#11161b]"
          >
            <MenuIcon className="size-[24px]" />
          </div>

          <button
            className="cursor-pointer rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]"
            onClick={() => setIsDark((prev) => !prev)}
          >
            {!isDark ? (
              <LightModeIcon className="size-[24px]" />
            ) : (
              <DarkModeIcon className="size-[24px]" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="dark:bg-primary absolute top-20 right-14 z-1 mt-2 flex flex-col gap-2 rounded-2xl bg-white py-4 md:hidden">
          <li className="px-6 py-2 hover:bg-slate-100 dark:hover:bg-[#232b36]">
            <Link href="/">
              <h1 className="text-base font-bold">Blog</h1>
            </Link>
          </li>
          <li className="px-6 py-2 hover:bg-slate-100 dark:hover:bg-[#232b36]">
            <Link href="/">
              <h1 className="text-base font-bold">About Me</h1>
            </Link>
          </li>
          <li className="px-6 py-2 hover:bg-slate-100 dark:hover:bg-[#232b36]">
            <Link href="/">
              <h1 className="text-base font-bold">GitHub</h1>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
