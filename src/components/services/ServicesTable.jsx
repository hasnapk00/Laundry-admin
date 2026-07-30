import { BriefcaseBusiness, Edit, Trash2, IndianRupee } from "lucide-react";
import { useServices } from "../../context/ServiceContext";
import { SkeletonRows } from "../TableSkeleton";

const ServicesTable = ({ onEdit, onDelete, services = [] }) => {
  const { deleteService, loading } = useServices();

  const getTotal = (service) => {
    const subtotal = Number(service.price) || 0;
    const discount = Number(service.discount) || 0;
    const tax = Number(service.tax) || 0;
    return Math.max(subtotal - discount + tax, 0);
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Service
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Category
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Unit
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Price
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Discount
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <SkeletonRows rows={5} columns={7} />
            ) : services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service.serviceID}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors "
                >
                  <td className="px-3 py-2">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {service.serviceName}
                    </p>
                    {service.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {service.description}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-flex whitespace-nowrap rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                      {service.categoryName}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {service.unit || "-"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#E8A843] whitespace-nowrap">
  ₹{Number(service.price).toFixed(2)}
</span>
                      {(Number(service.discount) > 0 || Number(service.tax) > 0) && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 whitespace-nowrap">
                          ₹{Number(service.price).toFixed(2)} base
                          {Number(service.discount) > 0 && ` · -₹${service.discount}`}
                          {Number(service.tax) > 0 && ` · +₹${service.tax}`}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-sm whitespace-nowrap">
                      {Number(service.discount) > 0 ? (
                        <span className="font-medium text-red-500 dark:text-red-400">
                          -₹{Number(service.discount).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        service.status?.toLowerCase() === "active"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button
                       onClick={() => onEdit?.(service)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                        title="Edit Service"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (onDelete) {
                            onDelete(service);
                          } else {
                            deleteService(service.serviceID);
                          }
                        }}
                        className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <BriefcaseBusiness size={24} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      No Services Found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Click <span className="font-medium text-[#E8A843]">"Add Service"</span> to
                      create your first service.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;