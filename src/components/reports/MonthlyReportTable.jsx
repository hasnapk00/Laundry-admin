import { TrendingUp, TrendingDown, Minus, CalendarRange, ChevronRight } from "lucide-react";

const MonthlyReportTable = ({ months, loading, onRowClick }) => {
  if (loading) {
    return (
      <div className="h-48 sm:h-64 animate-pulse rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-zinc-800" />
    );
  }

  const maxRevenue = Math.max(1, ...months.map((m) => m.revenue));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
          <CalendarRange size={16} />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            Monthly Performance
          </h2>
          <p className="truncate text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            Orders and revenue broken down by month, most recent first.
          </p>
        </div>
      </div>

      {months.length === 0 ? (
        <div className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          No order history available yet.
        </div>
      ) : (
        <div className="overflow-x-auto -mx-0 sm:mx-0">
          <table className="min-w-[720px] w-full">
            <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Month
                </th>
                <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Total Orders
                </th>
                <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Completed
                </th>
                <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Revenue
                </th>
                <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Avg. Order Value
                </th>
                <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Growth
                </th>
                {onRowClick && <th className="px-3 py-2" />}
              </tr>
            </thead>

            <tbody>
              {months.map((month) => (
                <tr
                  key={month.key}
                  onClick={() => onRowClick?.(month)}
                  className={`border-t border-gray-100 dark:border-gray-800/80 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 text-sm font-medium text-gray-900 dark:text-white">
                    {month.label}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 dark:text-gray-300">
                    {month.totalOrders}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 dark:text-gray-300">
                    {month.completed}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-16 shrink-0 text-xs font-medium text-gray-900 dark:text-white">
                        ₹{month.revenue.toLocaleString()}
                      </span>
                      <div className="hidden h-1.5 flex-1 max-w-[80px] rounded-full bg-gray-100 dark:bg-gray-800 sm:block">
                        <div
                          className="h-1.5 rounded-full bg-[#E8A843]"
                          style={{ width: `${(month.revenue / maxRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-700 dark:text-gray-300">
                    ₹{month.avgOrderValue.toLocaleString()}
                  </td>
                  <td className="px-3 py-2.5">
                    <GrowthBadge growth={month.growth} />
                  </td>
                  {onRowClick && (
                    <td className="px-3 py-2.5 text-right">
                      <ChevronRight size={15} className="text-gray-400 dark:text-gray-500" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const GrowthBadge = ({ growth }) => {
  if (growth === null || growth === undefined) {
    return <span className="text-[11px] text-gray-400 dark:text-gray-500">—</span>;
  }

  const isFlat = Math.abs(growth) < 0.1;
  const isUp = growth > 0;

  const Icon = isFlat ? Minus : isUp ? TrendingUp : TrendingDown;
  const colorClass = isFlat
    ? "text-gray-500 dark:text-gray-400"
    : isUp
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${colorClass}`}>
      <Icon size={12} />
      {Math.abs(growth).toFixed(1)}%
    </span>
  );
};

export default MonthlyReportTable;