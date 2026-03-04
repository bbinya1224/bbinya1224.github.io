import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "@/lib/useDarkMode";

interface MermaidProps {
  chart: string;
}

const getRenderedClassName = (isRendered: boolean) =>
  `mermaid not-prose my-8 flex items-center justify-center overflow-x-auto rounded-lg border border-line bg-surface p-6 shadow-sm transition-opacity duration-200 ${isRendered ? "opacity-100" : "opacity-0"}`;

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const isDark = useDarkMode();
  const theme = isDark ? "dark" : "default";

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
      let stale = false;
      setIsRendered(false);
      setRenderError(false);
      ref.current.removeAttribute("data-processed");
      ref.current.textContent = chart.trim();

      mermaid
        .run({ nodes: [ref.current] })
        .then(() => {
          if (!stale) setIsRendered(true);
        })
        .catch(() => {
          if (!stale) {
            setRenderError(true);
            setIsRendered(true);
          }
        });

      return () => { stale = true; };
    }
  }, [hasMounted, chart, theme]);

  if (!hasMounted) {
    return (
      <div className="h-24 w-full animate-pulse rounded bg-canvas" />
    );
  }

  return (
    <div
      className={getRenderedClassName(isRendered)}
      ref={ref}
      key={theme}
    >
      {renderError
        ? <p role="alert" className="text-sm text-subtle">다이어그램을 렌더링할 수 없습니다.</p>
        : chart}
    </div>
  );
};

export default Mermaid;
