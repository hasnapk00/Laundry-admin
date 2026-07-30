import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkeletonRows } from "../TableSkeleton";

const PickupTable = ({
  pickups = [],
  loading = false,
}) => {

      const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200 text-gray-900 dark:text-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr className="text-left text-xs sm:text-sm font-semibold text-gray-650 dark:text-gray-400">
              <th className="px-3 py-2 whitespace-nowrap">Pickup ID</th>
              <th className="px-3 py-2 whitespace-nowrap">Order ID</th>
              <th className="px-3 py-2 whitespace-nowrap">Customer</th>
              <th className="px-3 py-2 whitespace-nowrap">Phone</th>
              <th className="px-3 py-2 whitespace-nowrap">Pickup Date</th>
              <th className="px-3 py-2 whitespace-nowrap">Pickup Time</th>
              <th className="px-3 py-2 whitespace-nowrap">Status</th>
              <th className="px-3 py-2 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <SkeletonRows rows={5} columns={8} />
            ) : pickups.length > 0 ? (
              pickups.map((pickup) => (
                <tr
                  key={pickup.id}
                  className="border-t border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors text-sm"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{pickup.pickup_id}</td>

                  <td className="px-3 py-2 whitespace-nowrap">{pickup.order_id}</td>

                  <td className="px-3 py-2 font-medium whitespace-nowrap">
                    {pickup.customer_name}
                  </td>

                  <td className="px-3 py-2 whitespace-nowrap">{pickup.phone}</td>

                  <td className="px-3 py-2 whitespace-nowrap">{pickup.pickup_date}</td>

                  <td className="px-3 py-2 whitespace-nowrap">{pickup.pickup_time}</td>

                  <td className="px-3 py-2">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        pickup.status === "Scheduled"
                          ? "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400"
                          : pickup.status === "Picked Up"
                          ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {pickup.status}
                    </span>
                  </td>

                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => navigate(`/pickup-delivery/${pickup.pickup_id}`)}
                      className="rounded-lg p-1 text-[#E8A843] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-3 py-8 text-center text-gray-500 dark:text-gray-400 text-sm"
                >
                  No pickup schedules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PickupTable;