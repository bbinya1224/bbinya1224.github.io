"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Logo from "@/widgets/header/icons/ic_bbinya-logo.svg";
import DarkModeIcon from "@/widgets/header/icons/ic_darkMode.svg";
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
      className={`fixed top-0 left-1/2 z-50 flex w-full max-w-[var(--page-width)] -translate-x-1/2 flex-col border-b border-gray-100 bg-white px-4 transition-all duration-300 ease-out sm:px-8 dark:border-gray-800 dark:bg-[#171717] dark:text-white ${isVisible ? "translate-y-0" : "-translate-y-full"} `}
    >
      <div className="flex h-16 items-center justify-between">
        <Link href="/blog">
          <Logo className="h-8 w-auto sm:h-10" />
        </Link>

        <button
          className="cursor-pointer rounded-full p-2 hover:bg-slate-100 dark:hover:bg-[#11161b]"
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
    </header>
  );
};

export default Header;
