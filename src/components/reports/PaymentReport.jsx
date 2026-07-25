import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
      .filter(p => (p.method || "Others") === method)
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
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
      .filter(p => (p.status || "Unknown") === status)
      .reduce((sum, p) => sum + Number(p.amount || 0), 0)
  }));
};

export default function PaymentReport({ payments = [], compact = false }) {
  const grouped = {};

  payments.forEach((payment) => {
    const method = payment.method || "Others";
    grouped[method] = (grouped[method] || 0) + 1;
  });

  const data = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderCustomLabel = ({ cx, cy }) => (
    <>
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`fill-gray-900 dark:fill-white ${compact ? 'text-base' : 'text-xl'} font-bold`}
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`fill-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}
      >
        Payments
      </text>
    </>
  );

  return (
    <div className={`bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm ${compact ? 'p-4 h-80' : 'p-6 h-full'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${compact ? 'mb-3' : 'mb-6'}`}>
        <div>
          <h2 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 dark:text-white`}>
            Payment Methods
          </h2>
          {!compact && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Distribution of received payments
            </p>
          )}
        </div>
        {!compact && (
          <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
        )}
      </div>

      <div className={`grid ${compact ? 'grid-cols-[1fr_120px]' : 'lg:grid-cols-[1fr_180px]'} gap-4 items-center h-[calc(100%-3rem)]`}>
        {/* Chart */}
        <div className={`${compact ? 'h-48' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={compact ? 35 : 55}
                outerRadius={compact ? 55 : 85}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} Payments`, "Count"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                  fontSize: compact ? "12px" : "14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className={`space-y-2 ${compact ? 'max-h-48 overflow-y-auto' : ''}`}>
          {data.slice(0, compact ? 4 : undefined).map((item, index) => {
            const percentage = total
              ? ((item.value / total) * 100).toFixed(1)
              : 0;

            return (
              <div
                key={item.name}
                className={`flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-700 ${compact ? 'p-2' : 'p-3'}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`${compact ? 'w-2 h-2' : 'w-3 h-3'} rounded-full`}
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <div>
                    <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-800 dark:text-gray-200`}>
                      {compact ? item.name.substring(0, 6) : item.name}
                    </p>
                    {!compact && (
                      <p className="text-xs text-gray-500">
                        {percentage}%
                      </p>
                    )}
                  </div>
                </div>
                <span className={`${compact ? 'text-sm' : 'font-semibold'} text-gray-900 dark:text-white`}>
                  {item.value}
                </span>
              </div>
            );
          })}
          {compact && data.length > 4 && (
            <p className="text-xs text-center text-gray-500">+{data.length - 4} more</p>
          )}
        </div>
      </div>
    </div>
  );
}