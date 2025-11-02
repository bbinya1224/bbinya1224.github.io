"use client";

import { usePagination } from "@/features/pagination/model/usePagination";

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    pageNumbers,
    hasPrevChunk,
    hasNextChunk,
    handlePageChange,
    goToPrevChunk,
    goToNextChunk,
  } = usePagination();

  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {hasPrevChunk && (
        <button
          onClick={goToPrevChunk}
          className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Previous chunk"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {pageNumbers.map((pageNum) => {
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`flex size-10 cursor-pointer items-center justify-center rounded-lg border font-medium transition ${
              isActive
                ? "border-amber-300 bg-amber-300 text-black dark:border-amber-300 dark:bg-amber-300"
                : "border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      {hasNextChunk && (
        <button
          onClick={goToNextChunk}
          className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Next chunk"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </nav>
  );
};

export default Pagination;
