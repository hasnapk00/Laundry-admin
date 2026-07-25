import { IndianRupee, ShoppingBag, Users, Wallet } from "lucide-react";
import { percentChange } from "./Reportutils";

// ============== Main Component ==============

const SummaryCards = ({
  orders,
  previousOrders,
  payments,
  previousPayments,
  loading,
  showTrend = true,
}) => {
  const revenue = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const previousRevenue = previousPayments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  const totalOrders = orders.length;
  const previousTotalOrders = previousOrders.length;

  const uniqueCustomers = new Set(orders.map((o) => o.customer)).size;
  const previousUniqueCustomers = new Set(previousOrders.map((o) => o.customer)).size;

  const averageOrder = totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;
  const previousAverageOrder =
    previousTotalOrders > 0 ? Math.round(previousRevenue / previousTotalOrders) : 0;

  const cards = [
    {
      id: "revenue",
      title: "Revenue",
      value: `₹${revenue.toLocaleString()}`,
      icon: IndianRupee,
      iconColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      trend: showTrend ? percentChange(revenue, previousRevenue) : null,
    },
    {
      id: "orders",
      title: "Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingBag,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      trend: showTrend ? percentChange(totalOrders, previousTotalOrders) : null,
    },
    {
      id: "customers",
      title: "Customers",
      value: uniqueCustomers.toLocaleString(),
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      trend: showTrend ? percentChange(uniqueCustomers, previousUniqueCustomers) : null,
    },
    {
      id: "average",
      title: "Average Order",
      value: `₹${averageOrder.toLocaleString()}`,
      icon: Wallet,
      iconColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      trend: showTrend ? percentChange(averageOrder, previousAverageOrder) : null,
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={<card.icon size={20} className={card.iconColor} />}
          iconBgColor={card.bgColor}
          trend={card.trend}
        />
      ))}
    </div>
  );
};

// ============== Summary Card ==============

const SummaryCard = ({ title, value, icon, iconBgColor = "bg-gray-100", trend }) => {
  const hasTrend = typeof trend === "number" && isFinite(trend);
  const trendUp = trend >= 0;

  return (
    <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {value}
          </h3>

          {hasTrend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-xs font-medium ${
                  trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {trendUp ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">vs last period</span>
            </div>
          )}
        </div>

        <div className={`rounded-xl p-2.5 ${iconBgColor} transition-colors group-hover:scale-105`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;