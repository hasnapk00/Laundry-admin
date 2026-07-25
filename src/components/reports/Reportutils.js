// Shared helpers for the Reports page — date parsing, period filtering,
// and month grouping. Kept in one place so every report widget stays
// in sync on what counts as "this month", "last quarter", etc.

export const PERIODS = [
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "thisQuarter", label: "This Quarter" },
  { value: "thisYear", label: "This Year" },
  { value: "all", label: "All Time" },
  { value: "custom", label: "Custom Range" },
];

// Mock dates come as "17 Jul 2026" strings — parses reliably as a Date.
export const parseDate = (value) => {
  const date = new Date(value);
  return isNaN(date) ? null : date;
};

// <input type="date"> gives "YYYY-MM-DD" strings. Parse them as local
// calendar dates (not UTC midnight) so they line up with the rest of the
// date logic here, which is all local-time based.
export const parseDateInput = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const startOfQuarter = (date) => {
  const quarterMonth = Math.floor(date.getMonth() / 3) * 3;
  return new Date(date.getFullYear(), quarterMonth, 1);
};
const startOfYear = (date) => new Date(date.getFullYear(), 0, 1);

// Returns { start, end } (end exclusive) for the given period, anchored to now.
// `customRange` is the { start, end } string pair from the date pickers and
// is only consulted when period === "custom".
export const getPeriodRange = (period, now = new Date(), customRange = null) => {
  switch (period) {
    case "thisMonth": {
      const start = startOfMonth(now);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
      return { start, end };
    }
    case "lastMonth": {
      const end = startOfMonth(now);
      const start = new Date(end.getFullYear(), end.getMonth() - 1, 1);
      return { start, end };
    }
    case "thisQuarter": {
      const start = startOfQuarter(now);
      const end = new Date(start.getFullYear(), start.getMonth() + 3, 1);
      return { start, end };
    }
    case "thisYear": {
      const start = startOfYear(now);
      const end = new Date(start.getFullYear() + 1, 0, 1);
      return { start, end };
    }
    case "custom": {
      const start = parseDateInput(customRange?.start);
      const endDay = parseDateInput(customRange?.end);
      if (!start || !endDay) return { start: null, end: null };
      // End date picked by the user is inclusive, so bump to the start of
      // the following day to make it exclusive like every other range here.
      const end = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate() + 1);
      return { start, end };
    }
    case "all":
    default:
      return { start: null, end: null };
  }
};

// Returns the equivalent immediately-prior range, for "vs last period" comparisons.
export const getPreviousPeriodRange = (period, now = new Date(), customRange = null) => {
  switch (period) {
    case "thisMonth":
      return getPeriodRange("lastMonth", now);
    case "lastMonth": {
      const end = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const start = new Date(end.getFullYear(), end.getMonth() - 1, 1);
      return { start, end };
    }
    case "thisQuarter": {
      const start = new Date(startOfQuarter(now).getFullYear(), startOfQuarter(now).getMonth() - 3, 1);
      const end = startOfQuarter(now);
      return { start, end };
    }
    case "thisYear": {
      const start = new Date(startOfYear(now).getFullYear() - 1, 0, 1);
      const end = startOfYear(now);
      return { start, end };
    }
    case "custom": {
      // "Previous period" for a custom range is the same-length window
      // immediately before it, so a 10-day range compares against the
      // prior 10 days.
      const range = getPeriodRange("custom", now, customRange);
      if (!range.start) return { start: null, end: null };
      const durationMs = range.end - range.start;
      const end = range.start;
      const start = new Date(range.start.getTime() - durationMs);
      return { start, end };
    }
    case "all":
    default:
      return { start: null, end: null };
  }
};

export const filterByDateRange = (items, dateKey, range) => {
  if (!range.start) return items;
  return items.filter((item) => {
    const date = parseDate(item[dateKey]);
    return date && date >= range.start && date < range.end;
  });
};

export const percentChange = (current, previous) => {
  if (!previous) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const formatMonthLabel = (date) =>
  date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

export const formatDayLabel = (date) =>
  date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

// Turns a "YYYY-M" bucket key (produced by groupOrdersByMonth) into a
// { start, end } range — lets any page re-derive a month's data from just
// the key, e.g. a URL param like /reports/month/2026-6.
export const monthKeyToRange = (key) => {
  const [year, month] = key.split("-").map(Number);
  return {
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 1),
  };
};

// Groups orders into a chronological list of monthly buckets, most recent first.
export const groupOrdersByMonth = (orders) => {
  const buckets = new Map();

  orders.forEach((order) => {
    const date = parseDate(order.orderDate);
    if (!date) return;

    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!buckets.has(key)) {
      buckets.set(key, {
        key,
        date: startOfMonth(date),
        label: formatMonthLabel(date),
        orders: [],
      });
    }
    buckets.get(key).orders.push(order);
  });

  const sorted = Array.from(buckets.values()).sort((a, b) => b.date - a.date);

  return sorted.map((bucket, index) => {
    const totalOrders = bucket.orders.length;
    const completed = bucket.orders.filter((o) => o.status === "Delivered").length;
    const revenue = bucket.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;

    const previous = sorted[index + 1];
    const previousRevenue = previous
      ? previous.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0)
      : null;
    const growth = previousRevenue !== null ? percentChange(revenue, previousRevenue) : null;

    return {
      key: bucket.key,
      label: bucket.label,
      totalOrders,
      completed,
      revenue,
      avgOrderValue,
      growth,
    };
  });
};

// Groups orders into a chronological list of daily buckets (oldest first) —
// powers the day-by-day revenue chart. When `range` is a bounded { start, end }
// (end exclusive), every day in the range is included even if it had zero
// revenue, so the chart shows a continuous timeline instead of skipping gaps.
// When range is null (e.g. period === "all"), only days with orders appear.
export const groupOrdersByDay = (orders, range = null) => {
  const buckets = new Map();

  const dayKey = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  orders.forEach((order) => {
    const date = parseDate(order.orderDate);
    if (!date) return;

    const key = dayKey(date);
    if (!buckets.has(key)) {
      buckets.set(key, {
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        orders: [],
      });
    }
    buckets.get(key).orders.push(order);
  });

  if (range?.start && range?.end) {
    const cursor = new Date(range.start);
    while (cursor < range.end) {
      const key = dayKey(cursor);
      if (!buckets.has(key)) {
        buckets.set(key, { date: new Date(cursor), orders: [] });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return Array.from(buckets.values())
    .sort((a, b) => a.date - b.date)
    .map((bucket) => {
      const revenue = bucket.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      return {
        key: dayKey(bucket.date),
        date: bucket.date,
        label: formatDayLabel(bucket.date),
        orders: bucket.orders.length,
        revenue,
      };
    });
};

// Shared CSV helpers — any page that needs an "Export CSV" button uses
// these two instead of re-implementing escaping/download boilerplate.
export const toCsv = (header, rows) =>
  [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");

export const downloadCsv = (csv, filename) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};