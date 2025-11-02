import { useAtom, useAtomValue } from "jotai";
import {
  currentPageAtom,
  POSTS_PER_PAGE,
  totalPagesAtom,
} from "@/features/pagination/model/paginationAtom";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const totalPages = useAtomValue(totalPagesAtom);

  const chunkSize = POSTS_PER_PAGE;
  const currentChunk = Math.floor((currentPage - 1) / chunkSize);
  const totalChunks = Math.ceil(totalPages / chunkSize);

  const hasPrevChunk = currentChunk > 0;
  const hasNextChunk = currentChunk < totalChunks - 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevChunk = () => {
    const prevChunkFirstPage = (currentChunk - 1) * chunkSize + 1;
    handlePageChange(prevChunkFirstPage);
  };

  const goToNextChunk = () => {
    const nextChunkFirstPage = (currentChunk + 1) * chunkSize + 1;
    handlePageChange(nextChunkFirstPage);
  };

  const getPageRange = () => {
    const startPage = currentChunk * chunkSize + 1;
    const endPage = Math.min(startPage + chunkSize - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const pageNumbers = getPageRange();

  return {
    currentPage,
    totalPages,
    pageNumbers,
    hasPrevChunk,
    hasNextChunk,
    handlePageChange,
    goToPrevChunk,
    goToNextChunk,
  };
};
