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
    fetchOffers,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    typeFilter,
    setTypeFilter,

    selectedOffer,
    setSelectedOffer,

    isModalOpen,
    setIsModalOpen,
  } = useOffer();

  useEffect(() => {
    fetchOffers();
  }, []);

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedOffers,
  } = usePagination(filteredOffers || [], 5);

  const handleAddOffer = () => {
    setSelectedOffer(null);
    setIsModalOpen(true);
  };

  const handleEditOffer = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, typeFilter, setCurrentPage]);

  return (
    <div className="space-y-4 md:space-y-5">

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <h1 className="text-xl font-bold text-[#231F20] dark:text-white">
          Offers
        </h1>

        <button
          onClick={handleAddOffer}
          className="flex items-center gap-2 rounded-xl bg-[#231F20] dark:bg-zinc-800 hover:bg-[#3a3335] dark:hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200"
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
        onEdit={handleEditOffer}
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
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};

export default Offers;