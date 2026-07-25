import { TrendingUp } from "lucide-react";

const RevenueTrendChart = ({ data = [], compact = false }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  if (!data.length) {
    return (
      <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] shadow-sm ${compact ? 'p-4 h-72' : 'h-56'} flex flex-col items-center justify-center`}>
        <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <TrendingUp className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-white">
          No Revenue Data
        </h3>
        <p className="text-sm text-gray-500">
          Weekly revenue will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] shadow-sm ${compact ? 'p-4 h-80' : 'p-6'}`}>
      {/* Header */}
      <div className={`flex ${compact ? 'flex-col items-start gap-2' : 'items-center justify-between'} mb-4`}>
        <div>
          <h2 className={`${compact ? 'text-base' : 'text-xl'} font-semibold text-gray-800 dark:text-white`}>
            Weekly Revenue
          </h2>
          {!compact && (
            <p className="text-sm text-gray-500 mt-1">
              Sunday - Saturday
            </p>
          )}
        </div>
        {!compact && (
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Revenue
            </p>
            <h2 className="text-2xl font-bold text-emerald-600">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h2>
          </div>
        )}
      </div>

      {/* Compact Total Revenue */}
      {compact && (
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Total Revenue
          </p>
          <h2 className="text-lg font-bold text-emerald-600">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h2>
        </div>
      )}

      {/* Chart */}
      <div className={`relative ${compact ? 'h-44' : 'h-64'}`}>
        {/* Grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="border-t border-dashed border-gray-200 dark:border-gray-700"
            />
          ))}
        </div>

        {/* Bars */}
        <div className="relative h-full flex items-end justify-between gap-2">
          {data.map((item) => (
            <div
              key={item.day}
              className="flex flex-col items-center flex-1 group"
            >
              {!compact && (
                <span className="mb-2 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition">
                  ₹{item.revenue.toLocaleString("en-IN")}
                </span>
              )}
              <div
                className={`w-full ${compact ? 'max-w-6' : 'max-w-10'} rounded-t-md bg-emerald-500 hover:bg-emerald-600 transition`}
                style={{
                  height: `${(item.revenue / maxRevenue) * (compact ? 120 : 180)}px`,
                }}
                title={`₹${item.revenue.toLocaleString("en-IN")}`}
              />
              <span className={`mt-2 ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700 dark:text-gray-300`}>
                {compact ? item.day.charAt(0) : item.day}
              </span>
              {!compact && (
                <span className="text-xs text-gray-400">
                  ₹{(item.revenue / 1000).toFixed(0)}k
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueTrendChart;