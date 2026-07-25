import { Search } from "lucide-react";

const CouponFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  discountTypeFilter,
  setDiscountTypeFilter,
  customerTypeFilter,
  setCustomerTypeFilter,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Search */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />

          <input
            type="text"
            placeholder="Search coupon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 py-2.5 pl-10 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#231F20] dark:focus:border-[#E8A843]"
          />
        </div>

        {/* Status */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-[#231F20] dark:focus:border-[#E8A843] cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Expired">Expired</option>
        </select>

        {/* Discount Type */}

        <select
          value={discountTypeFilter}
          onChange={(e) =>
            setDiscountTypeFilter(e.target.value)
          }
          className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-[#231F20] dark:focus:border-[#E8A843] cursor-pointer"
        >
          <option value="All">All Discount Types</option>
          <option value="Flat">Flat</option>
          <option value="Percentage">Percentage</option>
        </select>

        {/* Customer Type */}

        <select
          value={customerTypeFilter}
          onChange={(e) =>
            setCustomerTypeFilter(e.target.value)
          }
          className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-[#231F20] dark:focus:border-[#E8A843] cursor-pointer"
        >
          <option value="All">All Customers</option>
          <option value="New">New Customers</option>
          <option value="Existing">Existing Customers</option>
        </select>
      </div>
    </div>
  );
};

export default CouponFilters;