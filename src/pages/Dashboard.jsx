import {
  Package,
  IndianRupee,
  Clock3,
  CircleCheckBig,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrderStatusChart from "../components/dashboard/OrderStatusChart";
import { useDashboard } from "../context/DashboardContext";

export default function Dashboard() {
  const {
  stats,
  loading,
} = useDashboard();

  return (
    <div className="space-y-4 md:space-y-5 max-w-full overflow-x-hidden">
      {/* Heading */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h2>
      </div>

      {/* Statistics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
value={(stats.totalOrders ?? 0).toLocaleString()}
          change="+0% this month"
          icon={Package}
          iconBg="bg-[#E8A843]/10"
          iconColor="text-[#E8A843]"
          changeColor="text-green-600"
        />
        <StatCard
          title="Revenue"
value={`₹${(stats.totalRevenue ?? 0).toLocaleString()}`}
          change="+0% this month"
          icon={IndianRupee}
          iconBg="bg-green-100 dark:bg-green-900/20"
          iconColor="text-green-600 dark:text-green-400"
          changeColor="text-green-600"
        />
        <StatCard
          title="Pending Orders"
value={(stats.pendingOrders ?? 0).toLocaleString()}
          change="+0 today"
          icon={Clock3}
          iconBg="bg-yellow-100 dark:bg-yellow-900/20"
          iconColor="text-yellow-600 dark:text-yellow-400"
          changeColor="text-yellow-600"
        />
        <StatCard
          title="Completed"
value={(stats.completedOrders ?? 0).toLocaleString()}
          change="+0 today"
          icon={CircleCheckBig}
          iconBg="bg-blue-100 dark:bg-blue-900/20"
          iconColor="text-blue-600 dark:text-blue-400"
          changeColor="text-blue-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 min-w-0">
          <RevenueChart />
        </div>
        <div className="min-w-0">
          <OrderStatusChart />
        </div>
      </div>
    </div>
  );
}