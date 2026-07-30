import { Pencil, Trash2, Package, Edit } from "lucide-react";
import { SkeletonRows, SkeletonCards } from "../TableSkeleton";

const PackagesTable = ({ packages, onEdit, onDelete, loading = false }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "Inactive":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  if (loading) {
    return (
      <>
        <div className="hidden overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-3 py-2">Package</th>
                  <th className="hidden px-3 py-2 lg:table-cell">Services</th>
                  <th className="px-3 py-2">Original</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="hidden px-3 py-2 sm:table-cell">Savings</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                <SkeletonRows rows={5} columns={7} />
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-3 md:hidden">
          <SkeletonCards count={3} />
        </div>
      </>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-8 text-center shadow-sm">
        <Package size={40} className="mx-auto mb-3 text-gray-400" />
        <h3 className="text-base font-semibold text-[#231F20] dark:text-gray-100">
          No Packages Found
        </h3>
        <p className="mt-1 text-sm text-gray-500">No packages match your search.</p>
      </div>
    );
  }

  return (
    <>
      {/* Table (tablet + desktop) */}
      <div className="hidden overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="px-3 py-2">Package</th>
                <th className="hidden px-3 py-2 lg:table-cell">Services</th>
                <th className="px-3 py-2 whitespace-nowrap">Original</th>
                <th className="px-3 py-2 whitespace-nowrap">Price</th>
                <th className="hidden px-3 py-2 whitespace-nowrap sm:table-cell">Savings</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {packages.map((pkg) => {
                const savings = pkg.originalPrice - pkg.packagePrice;

                return (
                  <tr
                    key={pkg.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="max-w-[160px] px-3 py-2">
                      <p className="truncate font-semibold text-gray-900 dark:text-white">
                        {pkg.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">{pkg.id}</p>
                    </td>

                    <td className="hidden max-w-[220px] px-3 py-2 lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {pkg.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-[#F4EFD9] dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap text-gray-400 dark:text-gray-500 line-through">
                      ₹{pkg.originalPrice}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      ₹{pkg.packagePrice}
                    </td>

                    <td className="hidden px-3 py-2 whitespace-nowrap font-medium text-green-600 dark:text-green-400 sm:table-cell">
                      ₹{savings}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadge(
                          pkg.status
                        )}`}
                      >
                        {pkg.status}
                      </span>
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => onEdit(pkg)}
                          className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => onDelete?.(pkg)}
                          className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {packages.map((pkg) => {
          const savings = pkg.originalPrice - pkg.packagePrice;

          return (
            <div
              key={pkg.id}
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3 shadow-sm text-gray-900 dark:text-gray-100"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>
                  <p className="truncate text-xs text-gray-500">{pkg.id}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadge(
                    pkg.status
                  )}`}
                >
                  {pkg.status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {pkg.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-[#F4EFD9] dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Original</p>
                  <p className="text-gray-400 line-through">₹{pkg.originalPrice}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Package</p>
                  <p className="font-semibold text-[#E8A843]">₹{pkg.packagePrice}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Savings</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    ₹{savings}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 pt-2">
                <button
                  onClick={() => onEdit(pkg)}
                  className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-1.5 text-blue-600 dark:text-blue-400"
                  title="Edit Package"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete?.(pkg)}
                  className="rounded-lg bg-red-50 dark:bg-red-900/20 p-1.5 text-red-600 dark:text-red-400"
                  title="Delete Package"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PackagesTable;