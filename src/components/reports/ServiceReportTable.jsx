import { Sparkles } from "lucide-react";

export const buildServiceRows = (orders, compact = false) => {
  const buckets = new Map();
  orders.forEach((order) => {
    const service = order.service || "Other";
    if (!buckets.has(service)) {
      buckets.set(service, { service, orders: 0, revenue: 0 });
    }
    const bucket = buckets.get(service);
    bucket.orders += 1;
    bucket.revenue += Number(order.total) || 0;
  });

  const totalRevenue = Array.from(buckets.values()).reduce((sum, b) => sum + b.revenue, 0);
  const sortedRows = Array.from(buckets.values())
    .map((b) => ({
      ...b,
      avgOrderValue: b.orders > 0 ? Math.round(b.revenue / b.orders) : 0,
      share: totalRevenue > 0 ? (b.revenue / totalRevenue) * 100 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);
  
  // Only return top 5 if compact mode
  return compact ? sortedRows.slice(0, 5) : sortedRows;
};

const ServiceReportTable = ({ orders, loading, compact = false }) => {
  const rows = buildServiceRows(orders, compact);
  const totalRevenue = rows.reduce((sum, r) => sum + r.revenue, 0);

  if (loading) {
    return (
      <div className={`${compact ? 'h-72' : 'h-80'} animate-pulse rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30`} />
    );
  }

  return (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-xs overflow-hidden ${compact ? 'h-72' : ''}`}>
      {/* Header */}
      <div className={`border-b border-gray-200 dark:border-gray-800 ${compact ? 'px-3 py-2.5' : 'px-4 sm:px-5 py-3 sm:py-4'}`}>
        <div className="flex items-center gap-2">
          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400`}>
            <Sparkles size={compact ? 12 : 14} />
          </div>
          <div className="min-w-0">
            <h2 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-gray-900 dark:text-white`}>
              Service Breakdown
            </h2>
            {!compact && (
              <p className="truncate text-[11px] text-gray-600 dark:text-gray-400">
                Revenue by service • {rows.length} active services
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {rows.length === 0 ? (
        <div className="px-4 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
          No orders in this period.
        </div>
      ) : (
        <div className={`divide-y divide-gray-100 dark:divide-gray-800 ${compact ? 'overflow-y-auto max-h-48' : ''}`}>
          {/* Table Headers */}
          <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-800/30 text-[10px] font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            <div className={`${compact ? 'col-span-5' : 'col-span-4'}`}>Service</div>
            <div className="col-span-2 text-right">Orders</div>
            {!compact && <div className="col-span-2 text-right">Avg Value</div>}
            <div className={`${compact ? 'col-span-3' : 'col-span-2'} text-right`}>Revenue</div>
            <div className={`${compact ? 'col-span-2' : 'col-span-2'} text-right`}>Share</div>
          </div>

          {/* Rows */}
          {rows.map((row, idx) => (
            <div
              key={row.service}
              className={`px-3 py-1.5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors ${compact ? 'text-xs' : ''}`}
            >
              {/* Mobile */}
              <div className="md:hidden space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900 dark:text-white text-xs">{row.service}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {row.orders} orders
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-semibold text-gray-900 dark:text-white text-xs">
                      ₹{row.revenue.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {row.share.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="w-full h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                    style={{ width: `${row.share}%` }}
                  />
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-2 items-center">
                <div className={`${compact ? 'col-span-5' : 'col-span-4'}`}>
                  <p className={`truncate font-medium text-gray-900 dark:text-white ${compact ? 'text-[11px]' : 'text-xs'}`}>{row.service}</p>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ${compact ? 'text-[11px]' : 'text-xs'} font-medium`}>
                    {row.orders}
                  </span>
                </div>
                {!compact && (
                  <div className="col-span-2 text-right text-xs text-gray-700 dark:text-gray-300">
                    ₹{row.avgOrderValue.toLocaleString()}
                  </div>
                )}
                <div className={`${compact ? 'col-span-3' : 'col-span-2'} text-right`}>
                  <p className={`font-semibold text-gray-900 dark:text-white ${compact ? 'text-[11px]' : 'text-xs'}`}>
                    ₹{row.revenue.toLocaleString()}
                  </p>
                </div>
                <div className={`${compact ? 'col-span-2' : 'col-span-2'} text-right`}>
                  <span className={`inline-flex items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10 ${compact ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs'} font-semibold text-amber-700 dark:text-amber-400`}>
                    {row.share.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Footer Summary - Only in non-compact view */}
          {!compact && (
            <div className="px-4 sm:px-5 py-3 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Compact Total Revenue */}
      {compact && rows.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between">
          <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400">Total</p>
          <p className="text-xs font-bold text-gray-900 dark:text-white">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceReportTable;