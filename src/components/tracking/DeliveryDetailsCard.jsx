import {
  MapPin,
  CalendarDays,
  PackageCheck,
  Package,
} from "lucide-react";

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

const DeliveryDetailsCard = ({ order }) => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Delivery Details
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-2.5 p-4">
        <InfoRow icon={MapPin} label="Pickup Address">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {order.pickupAddress}
          </p>
        </InfoRow>

        <InfoRow icon={MapPin} label="Delivery Address">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {order.deliveryAddress}
          </p>
        </InfoRow>

        <InfoRow icon={CalendarDays} label="Expected Delivery">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {order.expectedDelivery}
          </p>
        </InfoRow>

        <InfoRow icon={PackageCheck} label="Current Status">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              statusStyles[order.status] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
            }`}
          >
            {order.status}
          </span>
        </InfoRow>

        <InfoRow icon={Package} label="Order ID">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            #{order.id}
          </p>
        </InfoRow>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3 border-b border-gray-100 dark:border-gray-800 pb-2.5 last:border-none last:pb-0">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843] flex-shrink-0">
      <Icon size={15} />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <div className="mt-0.5">{children}</div>
    </div>
  </div>
);

export default DeliveryDetailsCard;