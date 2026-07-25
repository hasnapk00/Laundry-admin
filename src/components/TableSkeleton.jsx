// Reusable shimmering placeholders shown inside tables/card-lists while
// their data is being (lazily) fetched. Keeping this in one place means
// every table across the app gets a consistent loading feel.

const bar = "animate-pulse rounded bg-gray-200 dark:bg-gray-700";

/**
 * Skeleton <tr> rows to drop straight into a <tbody>.
 * Pass the real column count so the shimmer bars line up with the header.
 */
export const SkeletonRows = ({ rows = 5, columns = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <tr
        key={rowIndex}
        className="border-t border-gray-100 dark:border-gray-800/80"
      >
        {Array.from({ length: columns }).map((__, colIndex) => (
          <td key={colIndex} className="px-4 py-3">
            <div
              className={`h-3.5 ${bar}`}
              style={{ width: `${45 + ((rowIndex + colIndex) % 4) * 15}%` }}
            />
          </td>
        ))}
      </tr>
    ))}
  </>
);

/**
 * Skeleton cards for the mobile/stacked-list views most tables fall back to
 * on small screens.
 */
export const SkeletonCards = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className={`h-4 w-32 ${bar}`} />
            <div className={`h-3 w-20 ${bar}`} />
          </div>
          <div className={`h-5 w-16 rounded-full ${bar}`} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className={`h-3 ${bar}`} />
          <div className={`h-3 ${bar}`} />
          <div className={`h-3 ${bar}`} />
        </div>
      </div>
    ))}
  </>
);

/** Simple full-block shimmer, for tables that render as a single card rather than a <table>. */
export const SkeletonBlock = ({ className = "h-64" }) => (
  <div
    className={`${className} animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-zinc-800`}
  />
);
