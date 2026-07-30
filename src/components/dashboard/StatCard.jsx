import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconBg = "bg-[#E8A843]/10",
  iconColor = "text-[#E8A843]",
  changeColor,
}) => {
const isPositive = (change || "").startsWith("+");
  const resolvedChangeColor =
    changeColor || (isPositive ? "text-green-600" : "text-red-500");
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 group min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase truncate">
            {title}
          </p>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 text-gray-900 dark:text-white tracking-tight truncate">
            {value}
          </h3>
        </div>
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200`}>
          <Icon className={iconColor} size={16} strokeWidth={2.5} />
        </div>
      </div>

      {/* <div className="mt-2 sm:mt-4 flex items-center gap-1 sm:gap-1.5 flex-wrap">
        <div className={`flex items-center gap-1 ${resolvedChangeColor} text-xs sm:text-sm font-semibold`}>
          <TrendIcon size={14} strokeWidth={2.5} className="sm:w-4 sm:h-4" />
<span>{change || "0%"}</span>
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium">
          vs last month
        </span>
      </div> */}

      {change && (
  <div className="mt-2 sm:mt-4 flex items-center gap-1 sm:gap-1.5 flex-wrap">
    <div
      className={`flex items-center gap-1 ${resolvedChangeColor} text-xs sm:text-sm font-semibold`}
    >
      <TrendIcon size={14} strokeWidth={2.5} className="sm:w-4 sm:h-4" />
      <span>{change}</span>
    </div>

    <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium">
      vs last month
    </span>
  </div>
)}
    </div>
  );
};

export default StatCard;