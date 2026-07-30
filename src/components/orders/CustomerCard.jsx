import {
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const CustomerCard = ({ order }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 sm:p-6 shadow-sm">
      <h2 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
        Customer Information
      </h2>

      <div className="space-y-3 sm:space-y-4">
        <InfoRow
          icon={<User size={16} className="sm:w-[18px] sm:h-[18px]" />}
          label="Customer Name"
          value={order.customerName}
        />

        <InfoRow
          icon={<Phone size={16} className="sm:w-[18px] sm:h-[18px]" />}
          label="Phone Number"
          value={order.customerPhone}
        />

        <InfoRow
          icon={<Mail size={16} className="sm:w-[18px] sm:h-[18px]" />}
          label="Email Address"
          value={order.customerEmail}
        />

        <InfoRow
          icon={<MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />}
          label="Delivery Address"
          value={order.deliveryAddress}
          border={false}
          wrap
        />
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, border = true, wrap = false }) => (
  <div
    className={`flex items-start gap-3 sm:gap-4 ${
      border ? "border-b border-gray-100 dark:border-gray-800 pb-3 sm:pb-4" : ""
    }`}
  >
    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843] flex-shrink-0">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p
        className={`mt-0.5 sm:mt-1 text-sm font-semibold text-gray-900 dark:text-white ${
          wrap ? "break-words" : "truncate"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default CustomerCard;