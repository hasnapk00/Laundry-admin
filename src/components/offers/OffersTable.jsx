import {
  Pencil,
  Trash2,
  Percent,
  IndianRupee,
  Edit,
} from "lucide-react";
import { SkeletonRows, SkeletonCards } from "../TableSkeleton";

const OffersTable = ({
  offers,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "Expired":
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
                  <th className="px-4 py-2.5">Offer</th>
                  <th className="px-4 py-2.5">Type</th>
                  <th className="px-4 py-2.5">Discount</th>
                  <th className="px-4 py-2.5">Validity</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                <SkeletonRows rows={5} columns={6} />
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

  if (offers.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-[#231F20]">
          No Offers Found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing your search or filters.
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
                <th className="px-4 py-2.5">Offer</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Discount</th>
                <th className="px-4 py-2.5">Validity</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {offers.map((offer) => (
                <tr
                  key={offer.id}
                  className="border-t border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {offer.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {offer.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      {offer.type === "Percentage" ? (
                        <Percent size={14} />
                      ) : (
                        <IndianRupee size={14} />
                      )}

                      {offer.type}
                    </div>
                  </td>

                  <td className="px-4 py-2.5 text-gray-900 dark:text-white font-semibold">
                    {offer.discount}
                  </td>

                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    <div className="text-xs">
                      <p>{offer.startDate}</p>
                      <p className="text-gray-400">
                        to {offer.endDate}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span>
                  </td>

                  <td className="px-4 py-2.5">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => onEdit(offer)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete?.(offer)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm text-gray-900 dark:text-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {offer.name}
                </h3>

                <p className="mt-0.5 text-xs text-gray-500">
                  {offer.id}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                  offer.status
                )}`}
              >
                {offer.status}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{offer.type}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Discount</p>
                <p className="font-semibold text-[#E8A843]">{offer.discount}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Start</p>
                <p className="text-gray-700 dark:text-gray-300">{offer.startDate}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">End</p>
                <p className="text-gray-700 dark:text-gray-300">{offer.endDate}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-gray-150 dark:border-gray-800 pt-3">
              <button
                onClick={() => onEdit(offer)}
                className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-1.5 text-blue-600 dark:text-blue-400"
                title="Edit Offer"
              >
                <Pencil size={15} />
              </button>

              <button
                onClick={() => onDelete?.(offer)}
                className="rounded-lg bg-red-50 dark:bg-red-900/20 p-1.5 text-red-600 dark:text-red-400"
                title="Delete Offer"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OffersTable;