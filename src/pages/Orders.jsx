import { useState, useEffect } from "react";
import { Search, ChevronDown, PackageSearch, Filter, Eye } from "lucide-react";
import { ORDER_STATUS } from "../constants/OrderStatus";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import OrdersStats from "../components/orders/OrdersStats";
import { SkeletonBlock, SkeletonRows } from "../components/TableSkeleton";

const Orders = () => {
  const { orders, fetchOrders, loading } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

 // Filter orders based on search and status
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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };


  const getStatusColor = (status) => {
    const colors = {
      Pending:
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
      Accepted:
        "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
      "Picked Up":
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
      Washing:
        "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",
      Drying:
        "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400",
      Ironing:
        "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400",
      Ready:
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
      "Out for Delivery":
        "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400",
      Delivered:
        "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
    };
    return (
      colors[status] ||
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
    );
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Orders
        </h1>
      </div>

      {/* Stats */}
      <OrdersStats orders={orders || []} />

      {/* Search & Filter */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
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

          {/* Status Filter */}
          <div className="relative w-full lg:w-60">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <SkeletonRows rows={5} />
      ) : (
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Order ID
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Customer
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Phone
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Service
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
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
                    <td className="px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300">
                      {order.customer}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-650 dark:text-gray-400">
                      {order.phone}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300">
                      {order.service}
                    </td>
                    <td className="px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white">
                      {order.amount}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Eye
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="h-4.5 w-4.5 cursor-pointer text-gray-600 hover:text-[#e8a843]"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <PackageSearch
                          size={28}
                          className="text-gray-400 dark:text-gray-500"
                        />
                      </div>
                      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        No orders found
                      </h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {searchTerm || statusFilter !== "All Status"
                          ? "Try adjusting your search or filter"
                          : "Orders will appear here once they are received"}
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

export default Orders;