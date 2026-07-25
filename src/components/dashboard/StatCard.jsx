import { ArrowUpRight } from "lucide-react";

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconBg = "bg-[#E8A843]/10",
  iconColor = "text-[#E8A843]",
  changeColor = "text-green-600"
}) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            {title}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold mt-1 text-gray-900 dark:text-white tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200`}>
          <Icon className={iconColor} size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        <div className={`flex items-center gap-1 ${changeColor} text-sm font-semibold`}>
          <ArrowUpRight size={16} strokeWidth={2.5} />
          <span>{change}</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          vs last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;