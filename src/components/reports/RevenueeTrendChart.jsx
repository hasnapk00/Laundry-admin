import { TrendingUp } from "lucide-react";

const RevenueTrendChart = ({ data = [], compact = false }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  if (!data.length) {
    return (
      <div
        className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] shadow-sm ${
          compact ? "p-4 h-64" : "h-48 sm:h-52"
        } flex flex-col items-center justify-center`}
      >
        <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-gray-700 dark:text-white">
          No Revenue Data
        </h3>
        <p className="text-sm text-gray-500">Weekly revenue will appear here.</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] shadow-sm ${
        compact ? "p-3 h-72" : "p-4"
      }`}
    >
      {/* Header */}
      <div
        className={`mb-3 flex ${
          compact ? "flex-col items-start gap-1.5" : "flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        }`}
      >
        <div>
          <h2
            className={`${
              compact ? "text-sm" : "text-base sm:text-lg"
            } font-semibold text-gray-800 dark:text-white`}
          >
            Weekly Revenue
          </h2>
          {!compact && (
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">Sunday - Saturday</p>
          )}
        </div>
        {!compact && (
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold text-emerald-600 sm:text-2xl">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h2>
          </div>
        )}
      </div>

      {/* Compact Total Revenue */}
      {compact && (
        <div className="mb-2.5">
          <p className="text-xs uppercase tracking-wide text-gray-500">Total Revenue</p>
          <h2 className="text-lg font-bold text-emerald-600">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h2>
        </div>
      )}

      {/* Chart */}
      <div className={`relative ${compact ? "h-36" : "h-48 sm:h-56"}`}>
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
        <div className="relative flex h-full items-end justify-between gap-1.5 sm:gap-2">
          {data.map((item) => (
            <div key={item.day} className="group flex flex-1 flex-col items-center">
              {!compact && (
                <span className="mb-1.5 text-xs font-medium text-gray-500 opacity-0 transition group-hover:opacity-100">
                  ₹{item.revenue.toLocaleString("en-IN")}
                </span>
              )}
              <div
                className={`w-full ${
                  compact ? "max-w-5" : "max-w-6 sm:max-w-10"
                } rounded-t-md bg-emerald-500 transition hover:bg-emerald-600`}
                style={{
                  height: `${(item.revenue / maxRevenue) * (compact ? 100 : 150)}px`,
                }}
                title={`₹${item.revenue.toLocaleString("en-IN")}`}
              />
              <span
                className={`mt-1.5 ${
                  compact ? "text-xs" : "text-xs sm:text-sm"
                } font-medium text-gray-700 dark:text-gray-300`}
              >
                {compact ? item.day.charAt(0) : (
                  <>
                    <span className="sm:hidden">{item.day.slice(0, 3)}</span>
                    <span className="hidden sm:inline">{item.day}</span>
                  </>
                )}
              </span>
              {!compact && (
                <span className="hidden text-xs text-gray-400 sm:inline">
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