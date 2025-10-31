"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import DarkModeIcon from "@/widgets/header/icons/ic_darkMode.svg";
import HomeIcon from "@/widgets/header/icons/ic_home.svg";
import LightModeIcon from "@/widgets/header/icons/ic_lightMode.svg";

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`dark:bg-primary h-[4.5rem] max-w-[var(--page-width)] rounded-2xl rounded-t-none bg-white px-8 py-2 text-black shadow-lg transition-transform duration-300 ease-out dark:text-white ${isVisible ? "translate-y-0" : "-translate-y-full"} `}
    >
      <div className="relative top-1/2 mx-auto flex -translate-y-1/2 items-center justify-between">
        <div className="rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]">
          <Link href="/blog">
            <HomeIcon className="size-[24px]" />
          </Link>
        </div>

        <div className="flex flex-row">
          <div className="cursor-pointer rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]">
            {mounted ? (
              <Link href="/blog/about-me">About Me</Link>
            ) : (
              <Skeleton width={80} height={24} />
            )}
          </div>

          <button
            className="cursor-pointer rounded-full px-4 py-[10px] hover:bg-slate-100 dark:hover:bg-[#11161b]"
            aria-label={
              mounted
                ? isDark
                  ? "라이트 모드로 변경"
                  : "다크 모드로 변경"
                : "테마 변경"
            }
            title={mounted ? (isDark ? "라이트 모드" : "다크 모드") : "테마"}
            onClick={() => setTheme(!isDark ? "dark" : "light")}
          >
            {mounted ? (
              isDark ? (
                <LightModeIcon className="size-[24px]" />
              ) : (
                <DarkModeIcon className="size-[24px]" />
              )
            ) : (
              <Skeleton circle width={24} height={24} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
