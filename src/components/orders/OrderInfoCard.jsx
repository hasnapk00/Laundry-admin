import {
  Hash,
  CalendarDays,
  Truck,
  CreditCard,
  CircleDollarSign,
} from "lucide-react";

const OrderInfoCard = ({ order }) => {
  const paymentStatusColor = {
    Paid: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    Pending: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
    Failed: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    Unpaid: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        Order Information
      </h2>

      <div className="space-y-2.5">
        <InfoRow
          icon={<Hash size={15} />}
          label="Order ID"
          value={order.id}
        />

        <InfoRow
          icon={<CalendarDays size={15} />}
          label="Order Date"
          value={order.orderDate}
        />

        <InfoRow
          icon={<Truck size={15} />}
          label="Pickup Date"
          value={order.pickupDate}
        />

        <InfoRow
          icon={<Truck size={15} />}
          label="Delivery Date"
          value={order.deliveryDate}
        />

        <InfoRow
          icon={<CreditCard size={15} />}
          label="Payment Method"
          value={order.paymentMethod}
        />

        <div className="flex items-start gap-3 pt-0.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843] flex-shrink-0">
            <CircleDollarSign size={15} />
          </div>

          <div className="flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Payment Status
            </p>
            <span
              className={`mt-0.5 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                paymentStatusColor[order.paymentStatus] ||
                "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 border-b border-gray-100 dark:border-gray-800 pb-2.5 last:border-none last:pb-0">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843] flex-shrink-0">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white truncate">
        {value}
      </p>
    </div>
  </div>
);

export default OrderInfoCard;