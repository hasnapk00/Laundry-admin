import {
  Receipt,
  Wallet,
  BadgePercent,
  CircleDollarSign,
} from "lucide-react";

const PaymentSummary = ({ order }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8A843]/10 text-[#E8A843]">
          <Receipt size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment Summary
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Billing details
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <PaymentRow
          icon={<Wallet size={18} />}
          label="Subtotal"
          value={`₹${order.subtotal}`}
        />

        <PaymentRow
          icon={<BadgePercent size={18} />}
          label="Discount"
          value={`- ₹${order.discount}`}
          valueColor="text-green-600 dark:text-green-400"
        />

        <PaymentRow
          icon={<CircleDollarSign size={18} />}
          label="Tax"
          value={`₹${order.tax}`}
        />

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4 mt-1">
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            Total
          </span>
          <span className="text-2xl font-bold text-[#E8A843]">
            ₹{order.total}
          </span>
        </div>
      </div>
    </div>
  );
};

const PaymentRow = ({ icon, label, value, valueColor = "text-gray-900 dark:text-white" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="text-[#E8A843]">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
    <span className={`font-semibold ${valueColor}`}>
      {value}
    </span>
  </div>
);

export default PaymentSummary;