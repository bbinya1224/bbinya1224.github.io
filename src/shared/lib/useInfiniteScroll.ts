import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
};

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading = false,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, onLoadMore, isLoading]);

  return observerRef;
};
