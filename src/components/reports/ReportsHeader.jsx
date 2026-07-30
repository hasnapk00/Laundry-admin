import { Calendar, Download, BarChart3 } from "lucide-react";
import { PERIODS } from "./Reportutils";

const ReportsHeader = ({
  periodLabel,
  period,
  onPeriodChange,
  customRange,
  onCustomRangeChange,
  onExport,
  exportLabel,
  exportDisabled,
}) => {
  const lastUpdated = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
          <BarChart3 size={18} />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {periodLabel ? `Showing data for ${periodLabel} · ` : ""}
            Last updated {lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <div className="relative w-full sm:w-auto">
          <Calendar
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="w-full min-w-[140px] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 py-2 pl-8 pr-3 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843]"
            aria-label="Select reporting period"
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {period === "custom" && (
          <div className="flex w-full items-center gap-1.5 sm:w-auto">
            <input
              type="date"
              value={customRange.start}
              max={customRange.end || undefined}
              onChange={(e) => onCustomRangeChange({ start: e.target.value })}
              className="w-full min-w-0 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 px-2.5 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843]"
              aria-label="Custom range start date"
            />
            <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">to</span>
            <input
              type="date"
              value={customRange.end}
              min={customRange.start || undefined}
              onChange={(e) => onCustomRangeChange({ end: e.target.value })}
              className="w-full min-w-0 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 px-2.5 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843]"
              aria-label="Custom range end date"
            />
          </div>
        )}

        <button
          onClick={onExport}
          disabled={exportDisabled}
          title={exportDisabled ? "Nothing to export for this view" : undefined}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#231F20] dark:bg-[#E8A843] px-3.5 py-2 text-xs sm:text-sm font-medium text-white dark:text-[#231F20] shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40 sm:w-auto"
        >
          <Download size={14} />
          {exportLabel ? `Export ${exportLabel} CSV` : "Export CSV"}
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;