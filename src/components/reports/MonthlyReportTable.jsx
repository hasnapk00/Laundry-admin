import { TrendingUp, TrendingDown, Minus, CalendarRange, ChevronRight } from "lucide-react";

const MonthlyReportTable = ({ months, loading, onRowClick }) => {
  if (loading) {
    return (
      <div className="h-64 animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-zinc-800" />
    );
  }

  const maxRevenue = Math.max(1, ...months.map((m) => m.revenue));

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-gray-100 dark:border-gray-800 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
          <CalendarRange size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Monthly Performance
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Orders and revenue broken down by month, most recent first.
          </p>
        </div>
      </div>

      {months.length === 0 ? (
        <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
          No order history available yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Month
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Total Orders
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Completed
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Revenue
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Avg. Order Value
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Growth
                </th>
                {onRowClick && <th className="px-4 py-2.5" />}
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
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {month.label}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {month.totalOrders}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {month.completed}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-20 shrink-0 text-sm font-medium text-gray-900 dark:text-white">
                        ₹{month.revenue.toLocaleString()}
                      </span>
                      <div className="hidden h-1.5 flex-1 max-w-[100px] rounded-full bg-gray-100 dark:bg-gray-800 sm:block">
                        <div
                          className="h-1.5 rounded-full bg-[#E8A843]"
                          style={{ width: `${(month.revenue / maxRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    ₹{month.avgOrderValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <GrowthBadge growth={month.growth} />
                  </td>
                  {onRowClick && (
                    <td className="px-4 py-3 text-right">
                      <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
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
    return <span className="text-xs text-gray-400 dark:text-gray-500">—</span>;
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
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${colorClass}`}>
      <Icon size={13} />
      {Math.abs(growth).toFixed(1)}%
    </span>
  );
};

export default MonthlyReportTable;