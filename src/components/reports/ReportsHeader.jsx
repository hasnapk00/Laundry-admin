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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
          <BarChart3 size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {periodLabel ? `Showing data for ${periodLabel} · ` : ""}
            Last updated {lastUpdated}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-auto">
          <Calendar
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="w-full min-w-[160px] rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 py-2.5 pl-9 pr-4 text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843]"
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
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customRange.start}
              max={customRange.end || undefined}
              onChange={(e) => onCustomRangeChange({ start: e.target.value })}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 px-3 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843]"
              aria-label="Custom range start date"
            />
            <span className="text-sm text-gray-400 dark:text-gray-500">to</span>
            <input
              type="date"
              value={customRange.end}
              min={customRange.start || undefined}
              onChange={(e) => onCustomRangeChange({ end: e.target.value })}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 px-3 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843]"
              aria-label="Custom range end date"
            />
          </div>
        )}

        <button
          onClick={onExport}
          disabled={exportDisabled}
          title={exportDisabled ? "Nothing to export for this view" : undefined}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-4 py-2.5 text-sm font-medium text-white dark:text-[#231F20] shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40"
        >
          <Download size={16} />
          {exportLabel ? `Export ${exportLabel} CSV` : "Export CSV"}
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;