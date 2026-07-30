import { Edit, Edit2, Pencil, Trash2 } from "lucide-react";
import { useCoupon } from "../../context/CouponContext";
import { SkeletonCards, SkeletonRows } from "../TableSkeleton";

const CouponsTable = () => {
  const { filteredCoupons, openEditModal, deleteCoupon, loading } = useCoupon();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "Scheduled":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
      case "Expired":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      {/* Table (tablet + desktop) */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr className="text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              <th className="px-3 py-2.5 whitespace-nowrap">Coupon</th>
              <th className="px-3 py-2.5 whitespace-nowrap">Discount</th>
              <th className="hidden px-3 py-2.5 whitespace-nowrap lg:table-cell">Customer</th>
              <th className="hidden px-3 py-2.5 whitespace-nowrap lg:table-cell">Usage</th>
              <th className="px-3 py-2.5 whitespace-nowrap">Validity</th>
              <th className="px-3 py-2.5 whitespace-nowrap">Status</th>
              <th className="px-3 py-2.5 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <SkeletonRows rows={5} columns={7} />
            ) : filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <tr
                  key={coupon.couponID}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                >
                  <td className="max-w-[160px] px-3 py-2.5">
                    <p className="truncate font-semibold text-[#231F20] dark:text-gray-100">
                      {coupon.couponName}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-medium text-blue-600">
                      {coupon.couponCode}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 whitespace-nowrap">
                    {coupon.discountType === "Flat"
                      ? `₹${coupon.discountValue}`
                      : `${coupon.discountValue}%`}
                  </td>

                  <td className="hidden max-w-[120px] truncate px-3 py-2.5 lg:table-cell">
                    {coupon.customerType}
                  </td>

                  <td className="hidden px-3 py-2.5 whitespace-nowrap lg:table-cell">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </td>

                  <td className="px-3 py-2.5 text-xs whitespace-nowrap">
                    <p>{coupon.startDate}</p>
                    <p className="text-gray-500">{coupon.endDate}</p>
                  </td>

                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                        coupon.status
                      )}`}
                    >
                      {coupon.status}
                    </span>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(coupon)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteCoupon(coupon.couponID)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 p-3 md:hidden">
        {loading ? (
          <SkeletonCards count={3} />
        ) : filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.couponID}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-[#231F20] dark:text-gray-100">
                    {coupon.couponName}
                  </h3>
                  <p className="mt-0.5 truncate text-xs font-medium text-blue-600">
                    {coupon.couponCode}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                    coupon.status
                  )}`}
                >
                  {coupon.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-500">Discount</p>
                  <p className="font-medium">
                    {coupon.discountType === "Flat"
                      ? `₹${coupon.discountValue}`
                      : `${coupon.discountValue}%`}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Customer</p>
                  <p className="truncate font-medium">{coupon.customerType}</p>
                </div>

                <div>
                  <p className="text-gray-500">Usage</p>
                  <p className="font-medium">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Valid Till</p>
                  <p className="font-medium">{coupon.endDate}</p>
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-3">
                <button onClick={() => openEditModal(coupon)} className="text-blue-600">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteCoupon(coupon.couponID)} className="text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">No coupons found.</div>
        )}
      </div>
    </div>
  );
};

export default CouponsTable;