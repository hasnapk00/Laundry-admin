import {
  Package,
  IndianRupee,
  Clock3,
  CircleCheckBig,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrderStatusChart from "../components/dashboard/OrderStatusChart";
import { useOrders } from "../context/OrderContext";
import { usePayments } from "../context/PaymentContext";
import { useDashboard } from "../context/DashboardContext";

export default function Dashboard() {
const {
  totalOrders,
  pendingOrders,
  completedOrders,
  paymentSummary,
} = useDashboard();

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h2>
        
      </div>

      {/* Statistics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          change="+0% this month"
          icon={Package}
          iconBg="bg-[#E8A843]/10"
          iconColor="text-[#E8A843]"
          changeColor="text-green-600"
        />
        <StatCard
          title="Revenue"
          value={`₹${paymentSummary.revenue.toLocaleString()}`}
          change="+0% this month"
          icon={IndianRupee}
          iconBg="bg-green-100 dark:bg-green-900/20"
          iconColor="text-green-600 dark:text-green-400"
          changeColor="text-green-600"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders.toLocaleString()}
          change="+0 today"
          icon={Clock3}
          iconBg="bg-yellow-100 dark:bg-yellow-900/20"
          iconColor="text-yellow-600 dark:text-yellow-400"
          changeColor="text-yellow-600"
        />
        <StatCard
          title="Completed"
          value={completedOrders.toLocaleString()}
          change="+0 today"
          icon={CircleCheckBig}
          iconBg="bg-blue-100 dark:bg-blue-900/20"
          iconColor="text-blue-600 dark:text-blue-400"
          changeColor="text-blue-600"
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

    <div className="xl:col-span-2">

        <RevenueChart />

    </div>

    <OrderStatusChart />

</div>
    </div>
  );
}