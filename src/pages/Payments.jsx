import { useState, useEffect } from "react";
import { Search, Plus, CreditCard, IndianRupee, Clock3, Wallet, ChevronDown } from "lucide-react";
import PaymentsTable from "../components/payments/PaymentsTable";
import { usePayments } from "../context/PaymentContext";
import { usePagination } from "../hooks/usePagination";

const Payments = () => {
const {
  payments,
  summary,
  fetchPayments,
} = usePayments();  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");

 

  // Filter payments based on search, status, and method
  const filteredPayments = (payments || []).filter((payment) => {
   const matchesSearch =
String(payment.orderId).includes(search)
  payment.customerName
    ?.toLowerCase()
    .includes(search.toLowerCase());

    const matchesStatus =
  status === "All" ||
  payment.paymentStatus === status;

const matchesMethod =
  method === "All" ||
  payment.paymentMethod === method;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedPayments,
  } = usePagination(filteredPayments, 5);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, method, setCurrentPage]);

  // Summary data
const summaryData = summary;

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Payments
        </h1>
        
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Total Payments</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {summaryData.totalPayments}
              </h3>
            </div>
            <div className="rounded-xl bg-[#E8A843]/10 p-2.5 text-[#E8A843]">
              <CreditCard size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Paid</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {summaryData.paidPayments}
              </h3>
            </div>
            <div className="rounded-xl bg-green-100 dark:bg-green-900/20 p-2.5 text-green-600 dark:text-green-400">
              <Wallet size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Pending</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {summaryData.pendingPayments}
              </h3>
            </div>
            <div className="rounded-xl bg-yellow-100 dark:bg-yellow-900/20 p-2.5 text-yellow-600 dark:text-yellow-400">
              <Clock3 size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Revenue</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                ₹{summaryData.revenue}
              </h3>
            </div>
            <div className="rounded-xl bg-blue-100 dark:bg-blue-900/20 p-2.5 text-blue-600 dark:text-blue-400">
              <IndianRupee size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payment..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-2 pl-9 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-550"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer sm:w-40"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            <div className="relative">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer sm:w-40"
              >
                <option value="All">All Methods</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Wallet">Wallet</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
        <PaymentsTable
          payments={paginatedPayments}
        />
      </div>

    
    </div>
  );
};

export default Payments;