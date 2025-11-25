"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const mermaidTheme = resolvedTheme === "dark" ? "dark" : "default";

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: mermaidTheme,
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    setHasMounted(true);
  }, [mermaidTheme]);

  useEffect(() => {
    if (hasMounted && ref.current) {
      ref.current.removeAttribute("data-processed");
      ref.current.innerHTML = chart.trim();

      mermaid
        .run({
          nodes: [ref.current],
        })
        .catch((err: unknown) => {
          console.error("Mermaid rendering failed:", err);
        });
    }
  }, [hasMounted, chart, resolvedTheme]);

  if (!hasMounted) {
    return (
      <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
    );
  }

  return (
    <div
      className="mermaid not-prose my-8 flex items-center justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#404040] dark:bg-[#1e1e1e]"
      ref={ref}
      key={resolvedTheme}
    >
      {chart}
    </div>
  );
};

export default Mermaid;
