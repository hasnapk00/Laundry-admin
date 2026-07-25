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
    <div className="space-y-4 md:space-y-5">

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <h1 className="text-xl font-bold text-[#231F20] dark:text-white">
          Packages
        </h1>

        <button
          onClick={handleAddPackage}
          className="flex items-center gap-2 rounded-xl bg-[#231F20] dark:bg-zinc-800 hover:bg-[#3a3335] dark:hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200"
        >
          <Plus size={16} />
          Add Package
        </button>

      </div>

      <PackageStats stats={stats} />

      <PackageFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <PackagesTable
        packages={paginatedPackages}
        onEdit={handleEditPackage}
        loading={loading}
      />

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