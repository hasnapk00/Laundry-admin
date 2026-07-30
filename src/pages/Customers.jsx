import { useState, useEffect } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserPlus,
  Crown,
  ChevronDown,
} from "lucide-react";

import CustomersTable from "../components/customers/CustomersTable";
import Pagination from "../components/Pagination";
import { useCustomers } from "../context/CustomerContext";
import { usePagination } from "../hooks/usePagination";

const Customers = () => {
const {
  customers,
  summary,
  paymentSummary,
  loading,
} = useCustomers();
  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  

  // Filter customers based on search and status
  const filteredCustomers = (customers || []).filter((customer) => {
    const matchesSearch =
      customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedCustomers,
  } = usePagination(filteredCustomers, 5);

  // Event Handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="space-y-3  md:space-y-3 ">
      {/* Page Header */}
      <PageHeader title="Customers" />

      {/* Statistics Summary Cards */}
<SummaryCardsSection
  summary={summary}
  paymentSummary={paymentSummary}
/>
      {/* Search & Filter Controls */}
      <FiltersSection
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Customers Data Table */}
      <div className="overflow-x-auto rounded-lg">
        <CustomersTable
          customers={paginatedCustomers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredCustomers.length}
        pageSize={5}
        label="customers"
      />
    </div>
  );
};

// ============== Sub-Components ==============

const PageHeader = ({ title }) => (
  <div>
    <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
      {title}
    </h1>
  </div>
);

const SummaryCardsSection = ({
  summary = {},
  paymentSummary = {},
}) => {
  const cards = [
    {
      id: "total",
      icon: <Users className="text-[#E8A843]" size={16} />,
      title: "Total Customers",
      value: summary.totalCustomers ?? 0,
    },
    {
      id: "active",
      icon: <UserCheck className="text-green-600" size={16} />,
      title: "Active Customers",
      value: summary.activeCustomers ?? 0,
    },
    {
      id: "paid",
      icon: <UserPlus className="text-blue-600" size={16} />,
      title: "Paid Amount",
      value: `₹${paymentSummary.totalPaid ?? 0}`,
    },
    {
      id: "spent",
      icon: <Crown className="text-yellow-500" size={16} />,
      title: "Total Spent",
      value: `₹${summary.totalSpent ?? 0}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
};

const SummaryCard = ({ icon, title, value }) => (
  <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-2 sm:p-3 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase truncate">
          {title}
        </p>
        <h3 className="mt-0.5 text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>
      <div className="shrink-0 rounded-lg bg-gray-100 dark:bg-zinc-800 p-2">
        {icon}
      </div>
    </div>
  </div>
);

const FiltersSection = ({
  searchTerm,
  filterStatus,
  onSearchChange,
  onStatusChange,
}) => (
  <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-2.5 sm:p-3 shadow-sm transition-colors duration-200">
    <div className="flex flex-col gap-2 sm:flex-row">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-1.5 pl-8 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843]"
          aria-label="Search customers"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative sm:w-40">
        <select
          value={filterStatus}
          onChange={onStatusChange}
          className="w-full appearance-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-3 py-1.5 pr-9 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] cursor-pointer"
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  </div>
);

export default Customers;