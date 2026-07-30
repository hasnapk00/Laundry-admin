import { Package } from "lucide-react";

const ItemsTable = ({ order }) => {
  const items = Array.isArray(order) ? order : [];
const grandTotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A843]/10 text-[#E8A843] shrink-0">
          <Package size={16} />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            Order Items
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            Garments included in this order
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                #
              </th>
              <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Item
              </th>
              <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Service
              </th>
              <th className="px-3 sm:px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Qty
              </th>
              <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Unit Price
              </th>
              <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {items.map((item, index) => (
              <tr
                key={item.itemID || index}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <td className="px-3 sm:px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400">
                  {index + 1}
                </td>
                <td className="px-3 sm:px-4 py-2.5">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {item.itemName}
                  </p>
                </td>
                <td className="px-3 sm:px-4 py-2.5">
                  <span className="inline-flex rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                    {item.serviceName}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-2.5 text-center text-sm text-gray-600 dark:text-gray-400">
                  {item.quantity}
                </td>
                <td className="px-3 sm:px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  ₹{item.unitPrice}
                </td>
                <td className="px-3 sm:px-4 py-2.5 text-right font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  ₹{item.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
            <tr>
              <td
                colSpan={5}
                className="px-3 sm:px-4 py-2.5 text-right text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Grand Total
              </td>
              <td className="px-3 sm:px-4 py-2.5 text-right text-base font-bold text-[#E8A843] whitespace-nowrap">
                ₹{grandTotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;