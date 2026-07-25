import { BriefcaseBusiness, Edit, Trash2, IndianRupee } from "lucide-react";
import { useServices } from "../../context/ServiceContext";
import { SkeletonRows } from "../TableSkeleton";

const ServicesTable = ({ onEdit, onDelete, search = "" }) => {
  const { services, deleteService, loading } = useServices();

  const filteredServices = services.filter(
    (service) =>
      service.name?.toLowerCase().includes(search.toLowerCase()) ||
      service.category?.toLowerCase().includes(search.toLowerCase())
  );

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
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Service
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Category
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Unit
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Price
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <SkeletonRows rows={5} columns={6} />
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group"
                >
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {service.name}
                    </p>
                    {service.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {service.description}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {service.unit}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#E8A843]">
                        ₹{getTotal(service).toFixed(2)}
                      </span>
                      {(Number(service.discount) > 0 || Number(service.tax) > 0) && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                          ₹{service.price} base
                          {Number(service.discount) > 0 && ` · -₹${service.discount}`}
                          {Number(service.tax) > 0 && ` · +₹${service.tax}`}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        service.status === "Active"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onEdit(service)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                        title="Edit Service"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (onDelete) {
                            onDelete(service);
                          } else {
                            deleteService(service.id);
                          }
                        }}
                        className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <BriefcaseBusiness size={28} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
                      {search ? "No matching services found" : "No Services Found"}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                      {search ? (
                        "Try adjusting your search terms"
                      ) : (
                        <>
                          Click <span className="font-medium text-[#E8A843]">"Add Service"</span> to
                          create your first service.
                        </>
                      )}
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