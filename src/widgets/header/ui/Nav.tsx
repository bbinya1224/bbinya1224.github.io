"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" && !currentCategory;
    }
    if (path === "/lists") {
      return pathname === "/lists" || !!currentCategory;
    }
    return pathname === path;
  };

  const navItems = [
    { label: "Home", href: "/", active: isActive("/") },
    {
      label: "Lists",
      href: "/lists",
      active: isActive("/lists"),
    },
    {
      label: "About",
      href: "/about-me",
      active: isActive("/about-me"),
    },
  ];

  return (
    <nav className="mt-5 flex gap-8">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`relative pb-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-amber-300 after:transition-transform after:duration-300 ${
            item.active
              ? "text-black after:scale-x-100 dark:text-white"
              : "text-gray-500 after:scale-x-0 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
