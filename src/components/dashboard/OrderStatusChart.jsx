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
  const { orderStatusChart } = useDashboard();

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 h-[360px] text-gray-900 dark:text-white transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4">
        Order Status
      </h2>

      <ResponsiveContainer width="100%" height="63%">
        <PieChart>
          <Pie
            data={orderStatusChart}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {orderStatusChart.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-2 flex-col">
        {orderStatusChart.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-1"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />

            <span className="text-xs text-gray-600 dark:text-gray-300">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}