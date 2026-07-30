import { useState, useEffect } from "react";
import { Search, ChevronDown, Truck, Clock } from "lucide-react";
import { ORDER_STATUS } from "../constants/OrderStatus";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import TrackingStats from "../components/tracking/TrackingStats";
import { SkeletonRows } from "../components/TableSkeleton";

const Tracking = () => {
  const { orders, fetchOrders, loading } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
      Accepted: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
      "Picked Up": "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
      Washing: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",
      Drying: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400",
      Ironing: "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400",
      Ready: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
      "Out for Delivery": "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400",
      Delivered: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
    };
    return colors[status] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
  };

  const filteredOrders = (orders || []).filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedOrders,
  } = usePagination(filteredOrders, 5);

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Order Tracking
        </h1>
      </div>

      {/* Stats */}
      <TrackingStats orders={orders || []} />

      {/* Search & Filter */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-2 pl-9 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="relative w-full sm:w-52 lg:w-60 shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3.5 py-2 pr-9 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
            >
              <option>All Status</option>
              {ORDER_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Tracking Table */}
      {loading ? (
        <SkeletonRows rows={5} />
      ) : (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Customer
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Current Status
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Last Updated
                  </th>
                  <th className="px-3 sm:px-4 py-2 sm:py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-700 dark:text-gray-300">
                        {order.customer}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-2.5">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Clock
                            size={14}
                            className="text-gray-400 dark:text-gray-500 shrink-0"
                          />
                          <span>{order.updatedAt}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-center">
                        <button
                          onClick={() => navigate(`/tracking/${order.id}`)}
                          className="text-sm font-semibold text-[#E8A843] hover:text-[#d49a3a] transition-colors hover:underline whitespace-nowrap"
                        >
                          Track Order
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 sm:py-20">
                      <div className="flex flex-col items-center justify-center px-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Truck
                            size={24}
                            className="sm:w-7 sm:h-7 text-gray-400 dark:text-gray-500"
                          />
                        </div>
                        <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
                          {searchTerm || statusFilter !== "All Status"
                            ? "No Matching Orders"
                            : "No Active Orders"}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-gray-400 dark:text-gray-500 text-center">
                          {searchTerm || statusFilter !== "All Status"
                            ? "Try adjusting your search or filter"
                            : "Orders in progress will appear here"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredOrders.length}
        pageSize={5}
        label="orders"
      />
    </div>
  );
};

export default Tracking;