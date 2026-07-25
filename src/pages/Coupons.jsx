import { Plus } from "lucide-react";
import CouponStats from "../components/coupons/CouponStats";
import CouponFilters from "../components/coupons/CouponFilters";
import CouponsTable from "../components/coupons/CouponsTable";
import CouponModal from "../components/coupons/CouponModal";
import { useCoupon } from "../context/CouponContext";


const Coupons = () => {
  const {
    stats,
    filteredCoupons,

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

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-[#231F20] dark:text-white">
            Coupons
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create and manage promotional coupon codes.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-5 py-3 text-white transition hover:bg-black dark:hover:opacity-90"
        >
          <Plus size={18} />
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