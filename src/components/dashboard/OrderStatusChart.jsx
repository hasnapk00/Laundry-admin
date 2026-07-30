import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDashboard } from "../../context/DashboardContext";

const COLORS = [
  "#22C55E",
  "#F59E0B",
  "#3B82F6",
];

export default function OrderStatusChart() {
const { orderStatusSummary } = useDashboard();

const chartData = [
  {
    name: "Completed",
    value: orderStatusSummary.completedOrders ?? 0,
  },
  {
    name: "Pending",
    value: orderStatusSummary.pendingOrders ?? 0,
  },
  {
    name: "Cancelled",
    value: orderStatusSummary.cancelledOrders ?? 0,
  },
];
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 min-h-[320px] sm:h-[360px] text-gray-900 dark:text-white transition-colors duration-200 flex flex-col">

      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 shrink-0">
        Order Status
      </h2>

      <div className="flex-1 min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
data={chartData}
              innerRadius="55%"
              outerRadius="80%"
              dataKey="value"
            >
{chartData.map((entry, index) => (          
        <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1.5 shrink-0">
{chartData.map((item, index) => (
            <div
            key={item.name}
            className="flex items-center gap-1.5"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}