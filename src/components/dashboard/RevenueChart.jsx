import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useDashboard } from "../../context/DashboardContext";

export default function RevenueChart() {
const { revenueChart } = useDashboard();

const chartData = revenueChart.map((item) => ({
  date: new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }),
  revenue: item.revenue,
  orders: item.totalOrders,
}));

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 h-[280px] sm:h-[320px] md:h-[360px] text-gray-900 dark:text-white transition-colors duration-200 flex flex-col">

      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-6 shrink-0">
        Revenue Overview
      </h2>

      <div className="flex-1 min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
data={chartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              // dataKey="month"
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={12}
            />

            <YAxis
              tick={{ fontSize: 9 }}
              width={46}
            />

            {/* <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            /> */}

            <Tooltip
  contentStyle={{ fontSize: 12, borderRadius: 8 }}
  formatter={(value, name) => [
    `₹${value}`,
    name === "revenue" ? "Revenue" : name,
  ]}
/>

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#E8A843"
              strokeWidth={2.5}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}