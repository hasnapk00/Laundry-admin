import { useState, useEffect, useMemo } from "react";

/**
 * Generic client-side pagination hook.
 * Pass it the already-filtered/sorted array and it gives you back
 * the current page's slice plus everything needed to drive pagination UI.
 */
export const usePagination = (data = [], pageSize = 4) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // If a search/filter shrinks the list and the current page no longer
  // exists, snap back to page 1 instead of showing a blank page.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalItems: data.length,
    pageSize,
  };
};