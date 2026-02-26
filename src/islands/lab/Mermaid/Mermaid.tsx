import mermaid from "mermaid";
import React, { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [theme, setTheme] = useState<string>("default");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "default");

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "default");
    });
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
      className={`mermaid not-prose my-8 flex items-center justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-opacity duration-200 dark:border-[#404040] dark:bg-[#1e1e1e] ${isRendered ? "opacity-100" : "opacity-0"}`}
      ref={ref}
      key={theme}
    >
      {chart}
    </div>
  );
};

export default Mermaid;
