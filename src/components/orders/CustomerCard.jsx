import {
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const CustomerCard = ({ order }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Customer Information
      </h2>

      <div className="space-y-4">
        <InfoRow
          icon={<User size={18} />}
          label="Customer Name"
          value={order.customer}
        />

        <InfoRow
          icon={<Phone size={18} />}
          label="Phone Number"
          value={order.phone}
        />

        <InfoRow
          icon={<Mail size={18} />}
          label="Email Address"
          value={order.email}
        />

        <InfoRow
          icon={<MapPin size={18} />}
          label="Delivery Address"
          value={order.address}
          border={false}
        />
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, border = true }) => (
  <div
    className={`flex items-start gap-4 ${
      border ? "border-b border-gray-100 dark:border-gray-800 pb-4" : ""
    }`}
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843] flex-shrink-0">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white truncate">
        {value}
      </p>
    </div>
  </div>
);

export default CustomerCard;