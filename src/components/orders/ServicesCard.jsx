import { Sparkles } from "lucide-react";

const ServicesCard = ({ order }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8A843]/10 text-[#E8A843]">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Services
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Laundry services included in this order
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Service
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Qty
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Amount
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {order.services.map((service, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {service.service}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  {service.quantity}
                </td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-[#E8A843]">
                  ₹{service.amount}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Optional: Footer with total */}
          {order.servicesTotal && (
            <tfoot className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
              <tr>
                <td colSpan={2} className="px-6 py-3.5 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Total Services
                </td>
                <td className="px-6 py-3.5 text-right text-sm font-bold text-[#E8A843]">
                  ₹{order.servicesTotal}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default ServicesCard;