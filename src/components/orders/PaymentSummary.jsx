import {
  Receipt,
  Wallet,
  BadgePercent,
  CircleDollarSign,
} from "lucide-react";

const PaymentSummary = ({ payment }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[#E8A843]/10 text-[#E8A843] shrink-0">
          <Receipt size={18} className="sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
            Payment Summary
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            Billing details
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <PaymentRow
          icon={<Wallet size={16} />}
          label="Subtotal"
          value={`₹${payment.subtotalAmount}`}
        />

        <PaymentRow
          icon={<BadgePercent size={16} />}
          label="Discount"
          value={`- ₹${payment.discountAmount}`}
          valueColor="text-green-600 dark:text-green-400"
        />

        <PaymentRow
          icon={<CircleDollarSign size={16} />}
          label="Tax"
          value={`₹${payment.taxAmount}`}
        />

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-800 pt-3 sm:pt-4 mt-1">
          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white shrink-0">
            Total
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#E8A843] truncate">
            ₹{payment.totalAmount}
          </span>
        </div>
      </div>
    </div>
  );
};

const PaymentRow = ({ icon, label, value, valueColor = "text-gray-900 dark:text-white" }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <div className="text-[#E8A843] shrink-0">
        {icon}
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
        {label}
      </span>
    </div>
    <span className={`text-sm sm:text-base font-semibold shrink-0 ${valueColor}`}>
      {value}
    </span>
  </div>
);

export default PaymentSummary;