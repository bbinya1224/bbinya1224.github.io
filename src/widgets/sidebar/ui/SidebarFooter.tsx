import Link from "next/link";

const SidebarFooter = () => {
  return (
    <div className="mt-8 flex flex-col gap-4 pt-8 text-xs text-gray-400 dark:text-gray-500">
      <div className="flex justify-center gap-2">
        <Link
          href="/rss"
          className="hover:text-gray-600 dark:hover:text-gray-300"
        >
          RSS
        </Link>
        <span>/</span>
        <Link
          href="/sitemap.xml"
          className="hover:text-gray-600 dark:hover:text-gray-300"
        >
          Sitemap
        </Link>
      </div>

      <div className="flex flex-col gap-1 text-center">
        <p>
          © 2025 <span className="font-semibold">삔아</span> All Rights
          Reserved.
        </p>
        <p>Powered by 삔아</p>
      </div>
    </div>
  );
};

export default SidebarFooter;
