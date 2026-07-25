import {
  TicketPercent,
  CheckCircle2,
  Clock3,
  XCircle,
  TrendingUp,
} from "lucide-react";

const CouponStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Coupons",
      value: stats.total,
      icon: TicketPercent,
      bg: "bg-blue-100 dark:bg-blue-950/20",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Active",
      value: stats.active,
      icon: CheckCircle2,
      bg: "bg-green-100 dark:bg-green-950/20",
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Scheduled",
      value: stats.scheduled,
      icon: Clock3,
      bg: "bg-amber-100 dark:bg-amber-950/20",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Expired",
      value: stats.expired,
      icon: XCircle,
      bg: "bg-red-100 dark:bg-red-950/20",
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Total Redemptions",
      value: stats.redeemed,
      icon: TrendingUp,
      bg: "bg-purple-100 dark:bg-purple-950/20",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 shadow-sm transition-all hover:shadow-md dark:hover:shadow-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#231F20] dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${card.bg}`}>
                <Icon
                  size={24}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CouponStats;