const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  pageSize = 4,
  label = "items",
}) => {
  if (totalItems === 0) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-150 dark:border-gray-800 px-4 py-3 sm:flex-row">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium text-gray-700 dark:text-gray-300">{start}-{end}</span> of{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">{totalItems}</span> {label}
      </p>

      <div className="flex items-center gap-2.5">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-1.5">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;