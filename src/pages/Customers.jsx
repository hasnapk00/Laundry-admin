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
  const { customers, loading, fetchCustomers } = useCustomers();
  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search and status
  const filteredCustomers = (customers || []).filter((customer) => {
    const matchesSearch =
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="space-y-4 md:space-y-5">
      {/* Page Header */}
      <PageHeader title="Customers" />

      {/* Statistics Summary Cards */}
      <SummaryCardsSection customers={customers} />

      {/* Search & Filter Controls */}
      <FiltersSection
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Customers Data Table */}
      <CustomersTable
        customers={paginatedCustomers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />

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

const PageHeader = ({ title, description }) => (
  <div>
    <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
      {title}
    </h1>
  </div>
);

const SummaryCardsSection = ({ customers = [] }) => {
  const totalCount = customers.length;
  const activeCount = customers.filter((c) => c.status === "Active").length;
  const newCount = customers.filter((c) => c.status === "New").length;
  const vipCount = customers.filter(
    (c) => c.status === "VIP" || (c.ordersCount && c.ordersCount > 10)
  ).length;

  const cards = [
    {
      id: "total",
      icon: <Users className="text-[#E8A843]" size={18} />,
      title: "Total Customers",
      value: totalCount.toString(),
    },
    {
      id: "active",
      icon: <UserCheck className="text-green-600" size={18} />,
      title: "Active Customers",
      value: activeCount.toString(),
    },
    {
      id: "new",
      icon: <UserPlus className="text-blue-600" size={18} />,
      title: "New This Month",
      value: newCount.toString(),
    },
    {
      id: "vip",
      icon: <Crown className="text-yellow-500" size={18} />,
      title: "VIP Customers",
      value: vipCount.toString(),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">{title}</p>
        <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>
      <div className="rounded-xl bg-gray-100 dark:bg-zinc-800 p-2.5">
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
  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm transition-colors duration-200">
    <div className="flex flex-col gap-3 md:flex-row">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          placeholder="Search customer by name, email, or phone..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-2 pl-9 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843]"
          aria-label="Search customers"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative md:w-48">
        <select
          value={filterStatus}
          onChange={onStatusChange}
          className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white px-4 py-2 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] cursor-pointer"
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  </div>
);

export default Customers;