import { Plus } from "lucide-react";
import CouponStats from "../components/coupons/CouponStats";
import CouponFilters from "../components/coupons/CouponFilters";
import CouponsTable from "../components/coupons/CouponsTable";
import CouponModal from "../components/coupons/CouponModal";
import { useCoupon } from "../context/CouponContext";
import { useEffect } from "react";


const Coupons = () => {
  const {
  stats,
  filteredCoupons,
  loading,
  fetchCoupons,

  search,
  setSearch,

  statusFilter,
  setStatusFilter,

  discountTypeFilter,
  setDiscountTypeFilter,

  customerTypeFilter,
  setCustomerTypeFilter,

  selectedCoupon,
  isModalOpen,

  openAddModal,
  openEditModal,
  closeModal,
} = useCoupon();

useEffect(() => {
  fetchCoupons();
}, []);

  return (
    <div className="space-y-2 md:space-y-3">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#231F20] dark:text-white truncate">
            Coupons
          </h1>

          <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            Create and manage promotional coupon codes.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-[#231F20] hover:opacity-90 transition-opacity w-fit"
        >
          <Plus size={16} />
          Add Coupon
        </button>

      </div>

      {/* Statistics */}
      <CouponStats stats={stats} />

      {/* Filters */}
      <CouponFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        discountTypeFilter={discountTypeFilter}
        setDiscountTypeFilter={setDiscountTypeFilter}
        customerTypeFilter={customerTypeFilter}
        setCustomerTypeFilter={setCustomerTypeFilter}
      />

      {/* Table */}
      <CouponsTable
        coupons={filteredCoupons}
        onEdit={openEditModal}
      />

      {/* Modal */}
      <CouponModal
        isOpen={isModalOpen}
        coupon={selectedCoupon}
        onClose={closeModal}
      />
    </div>
  );
};

export default Coupons;