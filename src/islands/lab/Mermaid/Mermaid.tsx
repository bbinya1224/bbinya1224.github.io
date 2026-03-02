import mermaid from "mermaid";
import React, { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

const resolveMermaidTheme = (isDark: boolean) => (isDark ? "dark" : "default");
const isDarkMode = (root: Element) => root.classList.contains("dark");
const readThemeFromDocument = () => resolveMermaidTheme(isDarkMode(document.documentElement));
const getRenderedClassName = (isRendered: boolean) =>
  `mermaid not-prose my-8 flex items-center justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-opacity duration-200 dark:border-[#404040] dark:bg-[#1e1e1e] ${isRendered ? "opacity-100" : "opacity-0"}`;

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [theme, setTheme] = useState<string>("default");

  useEffect(() => {
    setTheme(readThemeFromDocument());

    const observer = new MutationObserver(() => setTheme(readThemeFromDocument()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: "strict",
      fontFamily: "inherit",
    });
    setHasMounted(true);
  }, [theme]);

  useEffect(() => {
    if (hasMounted && ref.current) {
      setIsRendered(false);
      ref.current.removeAttribute("data-processed");
      ref.current.textContent = chart.trim();

      mermaid
        .run({ nodes: [ref.current] })
        .then(() => setIsRendered(true))
        .catch((err: unknown) => {
          console.error("Mermaid rendering failed:", err);
        });
    }
  }, [hasMounted, chart, theme]);

  if (!hasMounted) {
    return (
      <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
    );
  }

  return (
    <div
      className={getRenderedClassName(isRendered)}
      ref={ref}
      key={theme}
    >
      {chart}
    </div>
  );
};

export default Mermaid;
