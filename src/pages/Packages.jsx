import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import PackageStats from "../components/packages/PackageStats";
import PackageFilters from "../components/packages/PackageFilters";
import PackagesTable from "../components/packages/PackagesTable";
import PackageModal from "../components/packages/PackageModal";
import Pagination from "../components/Pagination";
import { usePackage } from "../context/PackageContext";
import { usePagination } from "../hooks/usePagination";


const Packages = () => {
  const {
    filteredPackages,
    stats,
    loading,
    fetchPackages,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    selectedPackage,
    setSelectedPackage,

    isModalOpen,
    setIsModalOpen,
  } = usePackage();

  useEffect(() => {
    fetchPackages();
  }, []);

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedPackages,
  } = usePagination(filteredPackages || [], 5);

  const handleAddPackage = () => {
    setSelectedPackage(null);
    setIsModalOpen(true);
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, setCurrentPage]);

  return (
    <div className="space-y-3 sm:space-y-4">

      <div className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">

        <h1 className="text-lg sm:text-xl font-bold text-[#231F20] dark:text-white">
          Packages
        </h1>

        <button
          onClick={handleAddPackage}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-[#231F20] dark:bg-zinc-800 hover:bg-[#3a3335] dark:hover:bg-zinc-700 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 whitespace-nowrap"
        >
          <Plus size={14} className="shrink-0" />
          <span>Add Package</span>
        </button>

      </div>

      <PackageStats stats={stats} />

      <PackageFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
        <PackagesTable
          packages={paginatedPackages}
          onEdit={handleEditPackage}
          loading={loading}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredPackages?.length || 0}
        pageSize={5}
        label="packages"
      />

      <PackageModal
        isOpen={isModalOpen}
        data={selectedPackage}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};

export default Packages;