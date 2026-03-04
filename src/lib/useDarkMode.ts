import { useEffect, useState } from 'react';

const isDark = (root: Element) => root.classList.contains('dark');

export function useDarkMode(): boolean {
  const [dark, setDark] = useState(() =>
    typeof document === 'undefined' ? false : isDark(document.documentElement),
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(isDark(document.documentElement)),
    );

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return dark;
}
