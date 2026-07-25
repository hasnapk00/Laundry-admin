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
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F5EC] text-[#E8A843]">
          <RefreshCcw size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Update Status
          </h2>

          <p className="text-sm text-gray-500">
            Change the current order status.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Current Status
          </label>

          <select
            defaultValue={order.status}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E8A843] focus:ring-2 focus:ring-[#E8A843]/20"
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
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ${
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