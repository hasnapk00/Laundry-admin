import {
  TicketPercent,
  CheckCircle2,
  Clock3,
  XCircle,
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
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3 shadow-sm transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-900/50"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {card.title}
                </p>

                <h2 className="mt-1 text-lg sm:text-xl font-bold text-[#231F20] dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div className={`flex-shrink-0 rounded-md p-1.5 ${card.bg}`}>
                <Icon size={16} className={card.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CouponStats;