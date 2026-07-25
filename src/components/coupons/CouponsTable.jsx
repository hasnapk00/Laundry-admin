import { Edit, Pencil, Trash2 } from "lucide-react";
import { useCoupon } from "../../context/CouponContext";
import { SkeletonCards, SkeletonRows } from "../TableSkeleton";

const CouponsTable = () => {
  const {
    filteredCoupons,
    openEditModal,
    deleteCoupon,
    loading,
  } = useCoupon();

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

  if (loading) {
    return <TableSkeleton rows={6} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      {/* Desktop Table */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr className="text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
              <th className="px-6 py-4">Coupon</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4">Validity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

         <tbody>
            {loading ? (
              <SkeletonRows rows={5} columns={7} />
            ) : filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#231F20]">
                      {coupon.name}
                    </p>

                    <p className="mt-1 text-xs font-medium text-blue-600">
                      {coupon.code}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {coupon.discountType === "Flat"
                      ? `₹${coupon.discountValue}`
                      : `${coupon.discountValue}%`}
                  </td>

                  <td className="px-6 py-4">
                    {coupon.customerType}
                  </td>

                  <td className="px-6 py-4">
                    {coupon.usedCount} / {coupon.usageLimit}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <p>{coupon.startDate}</p>
                    <p className="text-gray-500">
                      {coupon.endDate}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                        coupon.status
                      )}`}
                    >
                      {coupon.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                       <button
                        onClick={() => onEdit(category)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
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
                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-500"
                >
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="space-y-4 p-4 lg:hidden">
        {loading ? (
          <SkeletonCards count={3} />
        ) : filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#231F20]">
                    {coupon.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-blue-600">
                    {coupon.code}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                    coupon.status
                  )}`}
                >
                  {coupon.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">
                    Discount
                  </p>

                  <p className="font-medium">
                    {coupon.discountType === "Flat"
                      ? `₹${coupon.discountValue}`
                      : `${coupon.discountValue}%`}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Customer
                  </p>

                  <p className="font-medium">
                    {coupon.customerType}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Usage
                  </p>

                  <p className="font-medium">
                    {coupon.usedCount} /{" "}
                    {coupon.usageLimit}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Valid Till
                  </p>

                  <p className="font-medium">
                    {coupon.endDate}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-4">
                <button
                  onClick={() =>
                    openEditModal(coupon)
                  }
                  className="text-blue-600"
                >
                  <Pencil size={20} />
                </button>

                <button
                  onClick={() =>
                    deleteCoupon(coupon.id)
                  }
                  className="text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No coupons found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsTable;