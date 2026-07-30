import {
  Pencil,
  Trash2,
  Percent,
  IndianRupee,
  Edit,
} from "lucide-react";
import { SkeletonRows, SkeletonCards } from "../TableSkeleton";
import { useOffer } from "../../context/OfferContext";

const OffersTable = ({
  offers,
  onEdit,
  loading = false,
}) => {

const { deleteOffer } = useOffer();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Scheduled":
        return "bg-blue-100 text-blue-700";

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
        <div className="hidden overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-3 sm:px-4 py-2">Offer</th>
                  <th className="px-3 sm:px-4 py-2">Type</th>
                  <th className="px-3 sm:px-4 py-2">Discount</th>
                  <th className="px-3 sm:px-4 py-2">Validity</th>
                  <th className="px-3 sm:px-4 py-2">Status</th>
                  <th className="px-3 sm:px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                <SkeletonRows rows={5} columns={6} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-2 sm:space-y-3 lg:hidden">
          <SkeletonCards count={3} />
        </div>
      </>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="rounded-lg sm:rounded-2xl border bg-white p-6 sm:p-8 text-center shadow-sm dark:bg-[#1a1a1a] dark:border-gray-800">
        <h3 className="text-base sm:text-lg font-semibold text-[#231F20] dark:text-white">
          No Offers Found
        </h3>

        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th className="px-3 sm:px-4 py-2">Offer</th>
                <th className="px-3 sm:px-4 py-2">Type</th>
                <th className="px-3 sm:px-4 py-2">Discount</th>
                <th className="px-3 sm:px-4 py-2">Validity</th>
                <th className="px-3 sm:px-4 py-2">Status</th>
                <th className="px-3 sm:px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs sm:text-sm">
              {offers.map((offer) => (
                <tr
                  key={offer.offerID}
                  className="border-t border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-3 sm:px-4 py-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">
                        {offer.offerName}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {offer.offerCode}
                      </p>
                    </div>
                  </td>

                  <td className="px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-1.5">
                      {offer.offerType === "Percentage" ? (
                        <Percent size={14} />
                      ) : (
                        <IndianRupee size={14} />
                      )}

                      <span className="text-xs sm:text-sm">{offer.offerType}</span>
                    </div>
                  </td>

                  <td className="px-3 sm:px-4 py-2 text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">
                   {offer.offerType === "Percentage"
  ? `${offer.discountValue}%`
  : `₹${offer.discountValue}`}
                  </td>

                  <td className="px-3 sm:px-4 py-2 text-gray-600 dark:text-gray-400">
                    <div className="text-xs">
                      <p>{new Date(offer.startDate).toLocaleDateString()}</p>

<p className="text-gray-400">
  to {new Date(offer.endDate).toLocaleDateString()}
</p>
                    </div>
                  </td>

                  <td className="px-3 sm:px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadge(
                        offer.status
                      )}`}
                    >
                      {offer.status}
                    </span>
                  </td>

                  <td className="px-3 sm:px-4 py-2">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => onEdit(offer)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.offerID)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
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

      <div className="space-y-2 sm:space-y-3 lg:hidden">
        {offers.map((offer) => (
          <div
            key={offer.offerID}
            className="rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3 sm:p-4 shadow-sm text-gray-900 dark:text-gray-100"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                  {offer.offerName}
                </h3>

                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                  {offer.offerCode}
                </p>
              </div>

              <span
                className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadge(
                  offer.status
                )}`}
              >
                {offer.status}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Type</p>
                <p className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm">{offer.offerType}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Discount</p>
                <p className="font-semibold text-[#E8A843] text-xs sm:text-sm">{offer.offerType === "Percentage"
  ? `${offer.discountValue}%`
  : `₹${offer.discountValue}`}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Start</p>
                <p className="text-gray-700 dark:text-gray-300 text-xs">{new Date(offer.startDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">End</p>
                <p className="text-gray-700 dark:text-gray-300 text-xs">{new Date(offer.endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-2 flex justify-end gap-1 border-t border-gray-100 dark:border-gray-800 pt-2">
              <button
                onClick={() => onEdit(offer)}
                className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                title="Edit Offer"
              >
                <Pencil size={14} />
              </button>

              <button
                onClick={() => deleteOffer(offer.offerID)}
                className="rounded-lg bg-red-50 dark:bg-red-900/20 p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                title="Delete Offer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OffersTable;