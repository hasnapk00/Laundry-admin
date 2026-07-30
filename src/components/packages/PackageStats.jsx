import {
  Package,
  CheckCircle2,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import { usePackage } from "../../context/PackageContext";



const PackageStats = () => {
  const { stats } = usePackage();  
  const cards = [
    {
      title: "Total Packages",
      value: stats.total,
      icon: Package,
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
      title: "Inactive",
      value: stats.inactive,
      icon: XCircle,
      bg: "bg-red-100 dark:bg-red-950/20",
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Purchased",
      value: stats.purchased,
      icon: ShoppingBag,
      bg: "bg-yellow-100 dark:bg-yellow-950/20",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
                  {card.title}
                </p>

                <h2 className="mt-0.5 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`shrink-0 rounded-lg p-2 ${card.bg}`}
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

export default PackageStats;