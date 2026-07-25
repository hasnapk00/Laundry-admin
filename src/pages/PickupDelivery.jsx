import { useState, useEffect } from "react";
import { Truck, PackageCheck, Clock3, MapPinned, Search, ChevronDown } from "lucide-react";
import PickupTable from "../components/pickup&delivery/PickupTable";
import DeliveryTable from "../components/pickup&delivery/DeliveryTable";
import Pagination from "../components/Pagination";
import { usePickupDelivery } from "../context/PickupDeliveryContext";
import { usePagination } from "../hooks/usePagination";

const PickupDelivery = () => {
  const [activeTab, setActiveTab] = useState("pickup");
  const { pickups, deliveries, loading, fetchSchedules } = usePickupDelivery();

  // Filter States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Filter pickups
  const filteredPickups = (pickups || []).filter((pickup) => {
    const matchesSearch =
      String(pickup.id || "").toLowerCase().includes(search.toLowerCase()) ||
      String(pickup.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      String(pickup.address || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || pickup.status === statusFilter;
    const matchesDate =
      !dateFilter || String(pickup.date || "") === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Filter deliveries
  const filteredDeliveries = (deliveries || []).filter((delivery) => {
    const matchesSearch =
      String(delivery.id || "").toLowerCase().includes(search.toLowerCase()) ||
      String(delivery.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      String(delivery.address || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || delivery.status === statusFilter;
    const matchesDate =
      !dateFilter || String(delivery.date || "") === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination Hooks
  const {
    currentPage: pickupCurrentPage,
    setCurrentPage: setPickupCurrentPage,
    totalPages: pickupTotalPages,
    paginatedData: paginatedPickups,
  } = usePagination(filteredPickups, 5);

  const {
    currentPage: deliveryCurrentPage,
    setCurrentPage: setDeliveryCurrentPage,
    totalPages: deliveryTotalPages,
    paginatedData: paginatedDeliveries,
  } = usePagination(filteredDeliveries, 5);

  // Reset to first page when filters change
  useEffect(() => {
    setPickupCurrentPage(1);
    setDeliveryCurrentPage(1);
  }, [search, statusFilter, dateFilter, setPickupCurrentPage, setDeliveryCurrentPage]);

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPickupCurrentPage(1);
    setDeliveryCurrentPage(1);
  };

  return (
    <div className="space-y-4 md:space-y-5">

      {/* Header */}

      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Pickup & Delivery
        </h1>

        
      </div>

      {/* Summary Cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Today's Pickups"
          value={pickups.length.toLocaleString()}
          icon={Truck}
        />

        <SummaryCard
          title="Today's Deliveries"
          value={deliveries.length.toLocaleString()}
          icon={PackageCheck}
        />

        <SummaryCard
          title="Pending Pickups"
          value={pickups.filter((p) => p.status === "Scheduled").length.toLocaleString()}
          icon={Clock3}
        />

        <SummaryCard
          title="Pending Deliveries"
          value={deliveries.filter((d) => d.status === "Pending" || d.status === "Out for Delivery").length.toLocaleString()}
          icon={MapPinned}
        />

      </div>

      {/* Filters */}

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm transition-colors duration-200">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Search by ID, customer, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-2 pl-9 outline-none transition-colors focus:border-[#E8A843] lg:w-80 text-sm"
            />
          </div>

          <div className="flex gap-3">

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-4 py-2 pr-10 outline-none transition-colors focus:border-[#E8A843] text-sm"
              >
                <option>All Status</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Out for Delivery</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-3 py-2 outline-none transition-colors focus:border-[#E8A843] text-sm"
            />

          </div>

        </div>

      </div>

      {/* Tabs */}

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-1 shadow-sm transition-colors duration-200">

        <div className="flex gap-2">

          <button
            onClick={() => handleTabChange("pickup")}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === "pickup"
                ? "bg-[#E8A843] text-white shadow-md shadow-[#E8A843]/20"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-white"
            }`}
          >
            Pickup
          </button>

          <button
            onClick={() => handleTabChange("delivery")}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === "delivery"
                ? "bg-[#E8A843] text-white shadow-md shadow-[#E8A843]/20"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-white"
            }`}
          >
            Delivery
          </button>

        </div>

      </div>

      {/* Table */}

      {activeTab === "pickup" ? (
        <>
          <PickupTable pickups={paginatedPickups} loading={loading} />
          
          {/* Pickup Pagination */}
          <Pagination
            currentPage={pickupCurrentPage}
            totalPages={pickupTotalPages}
            onPageChange={setPickupCurrentPage}
            totalItems={filteredPickups.length}
            pageSize={5}
            label="pickups"
          />
        </>
      ) : (
        <>
          <DeliveryTable deliveries={paginatedDeliveries} loading={loading} />
          
          {/* Delivery Pagination */}
          <Pagination
            currentPage={deliveryCurrentPage}
            totalPages={deliveryTotalPages}
            onPageChange={setDeliveryCurrentPage}
            totalItems={filteredDeliveries.length}
            pageSize={5}
            label="deliveries"
          />
        </>
      )}

    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">{title}</p>

        <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          {value}
        </h2>
      </div>

      <div className="rounded-xl bg-[#F4EFD9] dark:bg-[#E8A843]/10 p-2.5">
        <Icon className="text-[#E8A843]" size={18} />
      </div>
    </div>
  </div>
);

export default PickupDelivery;