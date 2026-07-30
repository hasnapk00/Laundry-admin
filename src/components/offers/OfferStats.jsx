import {
  BadgePercent,
  CalendarClock,
  CircleOff,
  Gift,
} from "lucide-react";
import { useOffer } from "../../context/OfferContext";

const OfferStats = () => {

      const { stats } = useOffer();  
    

  const cards = [
    {
      title: "Active Offers",
      value: stats.active,
      icon: BadgePercent,
      bg: "bg-green-100 dark:bg-green-950/20",
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Scheduled",
      value: stats.scheduled,
      icon: CalendarClock,
      bg: "bg-blue-100 dark:bg-blue-950/20",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Expired",
      value: stats.expired,
      icon: CircleOff,
      bg: "bg-red-100 dark:bg-red-950/20",
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Total Redemptions",
      value: stats.redeemed,
      icon: Gift,
      bg: "bg-yellow-100 dark:bg-yellow-950/20",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3 sm:p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase truncate">
                  {card.title}
                </p>

                <h2 className="mt-0.5 text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex-shrink-0 rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={16}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OfferStats;