import {
  Pencil,
  Trash2,
  Package,
  Edit,
} from "lucide-react";
import { SkeletonRows, SkeletonCards } from "../TableSkeleton";

const PackagesTable = ({
  packages,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Inactive":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <>
        {/* Desktop */}
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-4 py-2.5">Package</th>
                  <th className="px-4 py-2.5">Services</th>
                  <th className="px-4 py-2.5">Original Price</th>
                  <th className="px-4 py-2.5">Package Price</th>
                  <th className="px-4 py-2.5">Savings</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                <SkeletonRows rows={5} columns={7} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-4 lg:hidden">
          <SkeletonCards count={3} />
        </div>
      </>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
        <Package
          size={50}
          className="mx-auto mb-4 text-gray-400"
        />

        <h3 className="text-lg font-semibold text-[#231F20]">
          No Packages Found
        </h3>

        <p className="mt-2 text-gray-500">
          No packages match your search.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="px-4 py-2.5">Package</th>
                <th className="px-4 py-2.5">Services</th>
                <th className="px-4 py-2.5">Original Price</th>
                <th className="px-4 py-2.5">Package Price</th>
                <th className="px-4 py-2.5">Savings</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {packages.map((pkg) => {
                const savings =
                  pkg.originalPrice - pkg.packagePrice;

                return (
                  <tr
                    key={pkg.id}
                    className="border-t border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-4 py-2.5">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {pkg.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {pkg.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-[#F4EFD9] dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-gray-800 dark:text-gray-200 font-medium"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-2.5 text-gray-450 dark:text-gray-500 line-through">
                      ₹{pkg.originalPrice}
                    </td>

                    <td className="px-4 py-2.5 font-semibold text-gray-900 dark:text-white">
                      ₹{pkg.packagePrice}
                    </td>

                    <td className="px-4 py-2.5 font-medium text-green-600 dark:text-green-400">
                      ₹{savings}
                    </td>

                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                          pkg.status
                        )}`}
                      >
                        {pkg.status}
                      </span>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex justify-center gap-1">
                        
                        <button
                          onClick={() => onEdit(pkg)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                          onClick={() => onDelete?.(pkg)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
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

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">
        {packages.map((pkg) => {
          const savings =
            pkg.originalPrice - pkg.packagePrice;

          return (
            <div
              key={pkg.id}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm text-gray-900 dark:text-gray-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {pkg.id}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                    pkg.status
                  )}`}
                >
                  {pkg.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {pkg.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-[#F4EFD9] dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-gray-850 dark:text-gray-200 font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Original
                  </p>

                  <p className="line-through text-gray-400">
                    ₹{pkg.originalPrice}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Package
                  </p>

                  <p className="font-semibold text-[#E8A843]">
                    ₹{pkg.packagePrice}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Savings
                  </p>

                  <p className="font-semibold text-green-600 dark:text-green-400">
                    ₹{savings}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2 border-t border-gray-150 dark:border-gray-800 pt-3">
                <button
                  onClick={() => onEdit(pkg)}
                  className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-1.5 text-blue-600 dark:text-blue-400"
                  title="Edit Package"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => onDelete?.(pkg)}
                  className="rounded-lg bg-red-50 dark:bg-red-900/20 p-1.5 text-red-600 dark:text-red-400"
                  title="Delete Package"
                >
                  <Trash2 size={15} />
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