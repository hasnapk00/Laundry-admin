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
const { monthlyRevenue } = useDashboard();

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 h-[360px] text-gray-900 dark:text-white transition-colors duration-200">

      <h2 className="text-lg font-semibold mb-6">
        Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={monthlyRevenue}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#E8A843"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}