import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkeletonRows } from "../TableSkeleton";

const DeliveryTable = ({
  deliveries = [],
  loading = false,
}) => {

      const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200 text-gray-900 dark:text-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr className="text-left text-sm font-semibold text-gray-650 dark:text-gray-400">
              <th className="px-4 py-2.5">Delivery ID</th>
              <th className="px-4 py-2.5">Order ID</th>
              <th className="px-4 py-2.5">Customer</th>
              <th className="px-4 py-2.5">Phone</th>
              <th className="px-4 py-2.5">Delivery Date</th>
              <th className="px-4 py-2.5">Delivery Time</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <SkeletonRows rows={5} columns={8} />
            ) : deliveries.length > 0 ? (
              deliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="border-t border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors text-sm"
                >
                  <td className="px-4 py-2.5">{delivery.delivery_id}</td>

                  <td className="px-4 py-2.5">{delivery.order_id}</td>

                  <td className="px-4 py-2.5 font-medium">
                    {delivery.customer_name}
                  </td>

                  <td className="px-4 py-2.5">{delivery.phone}</td>

                  <td className="px-4 py-2.5">
                    {delivery.delivery_date}
                  </td>

                  <td className="px-4 py-2.5">
                    {delivery.delivery_time}
                  </td>

                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        delivery.status === "Pending"
                          ? "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400"
                          : delivery.status === "Out for Delivery"
                          ? "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                          : delivery.status === "Delivered"
                          ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>

                  <td className="px-4 py-2.5 text-center">
                    <button
                      onClick={() =>         navigate(`/pickup-delivery/${delivery.delivery_id}`)
}
                      className="rounded-lg p-1 text-[#E8A843] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-10 text-center text-gray-500 dark:text-gray-400 text-sm"
                >
                  No delivery schedules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DeliveryTable;