import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CreditCard } from "lucide-react";

const COLORS = [
  "#3B82F6", // Card
  "#22C55E", // Cash
  "#F59E0B", // UPI
  "#8B5CF6", // Wallet
  "#EF4444", // Others
];

// Export these functions for use in ReportsContext
export const buildMethodRows = (payments = []) => {
  const grouped = {};

  payments.forEach((payment) => {
    const method = payment.method || "Others";
    grouped[method] = (grouped[method] || 0) + 1;
  });

  return Object.entries(grouped).map(([method, count]) => ({
    method,
    count,
    amount: payments
      .filter((p) => (p.method || "Others") === method)
      .reduce((sum, p) => sum + Number(p.amount || 0), 0),
  }));
};

export const buildStatusRows = (payments = []) => {
  const grouped = {};

  payments.forEach((payment) => {
    const status = payment.status || "Unknown";
    grouped[status] = (grouped[status] || 0) + 1;
  });

  return Object.entries(grouped).map(([status, count]) => ({
    status,
    count,
    amount: payments
      .filter((p) => (p.status || "Unknown") === status)
      .reduce((sum, p) => sum + Number(p.amount || 0), 0),
  }));
};

export default function PaymentReport({ payments = [], compact = false }) {
  const grouped = {};

  payments.forEach((payment) => {
    const method = payment.method || "Others";
    grouped[method] = (grouped[method] || 0) + 1;
  });

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={`bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm ${
        compact ? "p-3 h-72" : "p-4"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between ${compact ? "mb-2" : "mb-4"}`}>
        <div className="min-w-0">
          <h2
            className={`${
              compact ? "text-sm" : "text-base"
            } font-semibold text-gray-900 dark:text-white`}
          >
            Payment Methods
          </h2>
          {!compact && (
            <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Distribution of received payments
            </p>
          )}
        </div>
        {!compact && (
          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30 sm:flex">
            <CreditCard className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
        )}
      </div>

      <div
        className={`grid gap-3 items-center ${
          compact ? "grid-cols-[1fr_110px]" : "sm:grid-cols-[1fr_160px]"
        }`}
      >
        {/* Chart */}
        <div className={compact ? "h-56" : "h-48 sm:h-56"}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={compact ? 32 : 48}
                outerRadius={compact ? 50 : 75}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} Payments`, "Count"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                  fontSize: compact ? "12px" : "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className={`space-y-1.5 ${compact ? "max-h-40 overflow-y-auto" : ""}`}>
          {data.slice(0, compact ? 4 : undefined).map((item, index) => {
            const percentage = total ? ((item.value / total) * 100).toFixed(1) : 0;

            return (
              <div
                key={item.name}
                className={`flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-700 ${
                  compact ? "p-1.5" : "p-2"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`shrink-0 rounded-full ${compact ? "h-2 w-2" : "h-2.5 w-2.5"}`}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="min-w-0">
                    <p
                      className={`truncate ${
                        compact ? "text-xs" : "text-sm"
                      } font-medium text-gray-800 dark:text-gray-200`}
                    >
                      {compact ? item.name.substring(0, 6) : item.name}
                    </p>
                    {!compact && (
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    )}
                  </div>
                </div>
                <span
                  className={`shrink-0 ${
                    compact ? "text-xs" : "text-sm font-semibold"
                  } text-gray-900 dark:text-white`}
                >
                  {item.value}
                </span>
              </div>
            );
          })}
          {compact && data.length > 4 && (
            <p className="text-center text-xs text-gray-500">+{data.length - 4} more</p>
          )}
        </div>
      </div>
    </div>
  );
}