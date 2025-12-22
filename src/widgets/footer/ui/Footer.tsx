const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <div className="mb-1 flex flex-row items-center justify-center gap-3">
        <p>
          © 2025 <span className="font-semibold">삔아 </span> All Rights
          Reserved.
        </p>
        <p className="flex justify-center gap-3 text-xs sm:text-sm">
          <a href="/rss.xml" className="transition-colors hover:text-amber-400">
            RSS
          </a>
          <span>/</span>
          <a
            href="/sitemap.xml"
            className="transition-colors hover:text-amber-400"
          >
            Sitemap
          </a>
        </p>
      </div>

      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        Powered by 삔아
      </p>
    </footer>
  );
};

export default Footer;
