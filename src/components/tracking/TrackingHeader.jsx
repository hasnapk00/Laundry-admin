import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Pending: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
  Accepted: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  Washing: "bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400",
  Drying: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
  Ironing: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400",
  Ready: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
  "Out for Delivery": "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",
  Delivered: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
};

const TrackingHeader = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/tracking")}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#E8A843] dark:hover:text-[#E8A843] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Tracking
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843]">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Order Tracking
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Order <span className="font-semibold text-gray-700 dark:text-gray-300">#{order.id}</span>
            </p>
          </div>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
            statusStyles[order.status] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default TrackingHeader;