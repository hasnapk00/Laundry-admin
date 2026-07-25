import { createContext, useContext, useMemo, useState } from "react";

import { useOrders } from "./OrderContext";
import { usePayments } from "./PaymentContext";
import {
  PERIODS,
  getPeriodRange,
  getPreviousPeriodRange,
  filterByDateRange,
  groupOrdersByMonth,
  groupOrdersByDay,
  monthKeyToRange,
  toCsv,
  downloadCsv,
} from "../components/reports/Reportutils";
import { buildServiceRows } from "../components/reports/ServiceReportTable";
import { buildMethodRows, buildStatusRows } from "../components/reports/PaymentReport";

const ReportsContext = createContext(null);

// Wrap /reports and /reports/month/:key with this so both pages share one
// source of truth instead of each re-deriving period ranges and filters.
export const ReportsProvider = ({ children }) => {
  const { orders, loading: ordersLoading } = useOrders();
  const { payments, loading: paymentsLoading } = usePayments();
  const [period, setPeriod] = useState("thisMonth");
  const [activeTab, setActiveTab] = useState("monthly"); // "monthly" | "services" | "payments"
  // { start, end } as "YYYY-MM-DD" strings straight from <input type="date">.
  // Only consulted when period === "custom".
  const [customRange, setCustomRangeState] = useState({ start: "", end: "" });

  const setCustomRange = (patch) => setCustomRangeState((prev) => ({ ...prev, ...patch }));

  const loading = ordersLoading || paymentsLoading;

  const isCustomIncomplete = period === "custom" && (!customRange.start || !customRange.end);

  const periodLabel = useMemo(() => {
    if (period === "custom") {
      if (isCustomIncomplete) return "Custom Range — pick both dates";
      const fmt = (value) =>
        new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      return `${fmt(customRange.start)} – ${fmt(customRange.end)}`;
    }
    return PERIODS.find((p) => p.value === period)?.label;
  }, [period, customRange, isCustomIncomplete]);

  // Current-period range, recomputed whenever the period or custom dates change.
  const dateRange = useMemo(
    () => getPeriodRange(period, new Date(), customRange),
    [period, customRange]
  );

  // Current-period slices, filtered by order/payment date. A custom period
  // with an incomplete range intentionally yields no data, rather than
  // silently falling back to "all time".
  const filteredOrders = useMemo(() => {
    if (isCustomIncomplete) return [];
    return filterByDateRange(orders, "orderDate", dateRange);
  }, [orders, dateRange, isCustomIncomplete]);

  const filteredPayments = useMemo(() => {
    if (isCustomIncomplete) return [];
    return filterByDateRange(payments, "date", dateRange);
  }, [payments, dateRange, isCustomIncomplete]);

  // Previous-period slices, for "vs last period" trend comparisons.
  const previousOrders = useMemo(() => {
    if (period === "all" || isCustomIncomplete) return [];
    return filterByDateRange(orders, "orderDate", getPreviousPeriodRange(period, new Date(), customRange));
  }, [orders, period, customRange, isCustomIncomplete]);

  const previousPayments = useMemo(() => {
    if (period === "all" || isCustomIncomplete) return [];
    return filterByDateRange(payments, "date", getPreviousPeriodRange(period, new Date(), customRange));
  }, [payments, period, customRange, isCustomIncomplete]);

  // Monthly table always shows the full order history, regardless of the
  // period filter above — that's the point of a month-by-month trend view.
  const monthlyRows = useMemo(() => groupOrdersByMonth(orders), [orders]);

  // Day-by-day revenue for the currently selected period/range — powers the
  // revenue trend chart. Bounded ranges (anything but "All Time") fill in
  // zero-revenue days so the chart has no gaps.
  const dailyRevenue = useMemo(() => {
    if (isCustomIncomplete) return [];
    return groupOrdersByDay(filteredOrders, dateRange.start ? dateRange : null);
  }, [filteredOrders, dateRange, isCustomIncomplete]);

  // On-demand rebuild of a single month's slice — used by the month
  // drill-down page, independent of whatever `period` is currently set.
  const getMonthOrders = (key) =>
    filterByDateRange(orders, "orderDate", monthKeyToRange(key));
  const getMonthPayments = (key) =>
    filterByDateRange(payments, "date", monthKeyToRange(key));

  // What "Export CSV" produces depends on which tab is open, so the file
  // always matches what's on screen instead of always dumping raw orders.
  const exportRowCount =
    activeTab === "monthly"
      ? monthlyRows.length
      : activeTab === "services"
      ? buildServiceRows(filteredOrders).length  // No compact needed here for export
      : buildMethodRows(filteredPayments).length;

  const exportLabel =
    activeTab === "monthly" ? "Monthly" : activeTab === "services" ? "Services" : "Payments";

  const exportCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    const periodTag = period === "custom" ? `${customRange.start}_to_${customRange.end}` : period;

    if (activeTab === "monthly") {
      const header = ["Month", "Total Orders", "Completed", "Revenue", "Avg Order Value", "Growth %"];
      const rows = monthlyRows.map((m) => [
        m.label,
        m.totalOrders,
        m.completed,
        m.revenue,
        m.avgOrderValue,
        m.growth === null ? "" : m.growth.toFixed(1),
      ]);
      downloadCsv(toCsv(header, rows), `monthly-report-${stamp}.csv`);
      return;
    }

    if (activeTab === "services") {
      const header = ["Service", "Orders", "Revenue", "Avg Order Value", "Share %"];
      // Pass false or omit compact parameter for full export
      const rows = buildServiceRows(filteredOrders, false).map((r) => [
        r.service,
        r.orders,
        r.revenue,
        r.avgOrderValue,
        r.share.toFixed(1),
      ]);
      downloadCsv(toCsv(header, rows), `service-report-${periodTag}-${stamp}.csv`);
      return;
    }

    // payments — two small sections (by method, by status) in one file.
    const methodRows = buildMethodRows(filteredPayments);
    const statusRows = buildStatusRows(filteredPayments);
    const header = ["Section", "Label", "Count", "Amount"];
    const rows = [
      ...methodRows.map((r) => ["By Method", r.method, r.count, r.amount]),
      ...statusRows.map((r) => ["By Status", r.status, r.count, r.amount]),
    ];
    downloadCsv(toCsv(header, rows), `payment-report-${periodTag}-${stamp}.csv`);
  };

  const value = {
    loading,
    period,
    setPeriod,
    periodLabel,
    customRange,
    setCustomRange,
    activeTab,
    setActiveTab,
    filteredOrders,
    filteredPayments,
    previousOrders,
    previousPayments,
    monthlyRows,
    dailyRevenue,
    getMonthOrders,
    getMonthPayments,
    exportCsv,
    exportLabel,
    exportDisabled: !loading && exportRowCount === 0,
  };

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

export const useReports = () => {
  const ctx = useContext(ReportsContext);
  if (!ctx) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return ctx;
};