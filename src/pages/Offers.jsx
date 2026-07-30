import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import OfferStats from "../components/offers/OfferStats";
import OfferFilters from "../components/offers/OfferFilters";
import OffersTable from "../components/offers/OffersTable";
import OfferModal from "../components/offers/OfferModal";
import Pagination from "../components/Pagination";
import { useOffer } from "../context/OfferContext";
import { usePagination } from "../hooks/usePagination";


const Offers = () => {
  const {
  filteredOffers,
  stats,
  loading,

  search,
  setSearch,

  statusFilter,
  setStatusFilter,

  typeFilter,
  setTypeFilter,

  selectedOffer,
  isModalOpen,

  openAddModal,
  openEditModal,
  closeModal,
} = useOffer();

  
  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedOffers,
  } = usePagination(filteredOffers || [], 5);



  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, typeFilter, setCurrentPage]);

  return (
    <div className="space-y-2 md:space-y-3">

      <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">

        <h1 className="text-lg sm:text-xl font-bold text-[#231F20] dark:text-white">
          Offers
        </h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-[#231F20] dark:bg-zinc-800 hover:bg-[#3a3335] dark:hover:bg-zinc-700 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 w-fit"
        >
          <Plus size={16} />
          Add Offer
        </button>

      </div>

      <OfferStats stats={stats} />

      <OfferFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

     <OffersTable
  offers={paginatedOffers}
  onEdit={openEditModal}
  loading={loading}
/>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredOffers?.length || 0}
        pageSize={5}
        label="offers"
      />

     <OfferModal
  isOpen={isModalOpen}
  data={selectedOffer}
  onClose={closeModal}
/>

    </div>
  );
};

export default Offers;