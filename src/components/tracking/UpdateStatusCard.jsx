import { Save, RefreshCcw } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS = [
  "Pending",
  "Accepted",
  "Picked Up",
  "Washing",
  "Drying",
  "Ironing",
  "Ready",
  "Out for Delivery",
  "Delivered",
];

const UpdateStatusCard = ({ order, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "Pending");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      if (onStatusUpdate) {
        onStatusUpdate(selectedStatus);
      }
      setIsUpdating(false);
    }, 500);
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 border-b border-gray-200 dark:border-gray-800 px-3.5 sm:px-6 py-3 sm:py-4">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#F8F5EC] dark:bg-[#E8A843]/10 text-[#E8A843] shrink-0">
          <RefreshCcw size={18} className="sm:w-5 sm:h-5" />
        </div>

        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
            Update Status
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            Change the current order status.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 sm:space-y-6 p-3.5 sm:p-6">
        <div>
          <label className="mb-1.5 sm:mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-900 dark:text-white outline-none transition focus:border-[#E8A843] focus:ring-2 focus:ring-[#E8A843]/20"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isUpdating || selectedStatus === order?.status}
            className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 sm:px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ${
              isUpdating || selectedStatus === order?.status
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
                : "bg-[#E8A843] hover:bg-[#d49a3a] hover:shadow-md"
            }`}
          >
            <Save size={18} />
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusCard;