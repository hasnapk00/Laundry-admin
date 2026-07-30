import { useEffect, useState } from "react";
import { CreditCard, SquarePen } from "lucide-react";
import { usePayments } from "../../context/PaymentContext";
import PaymentStatusPanel from "./PaymentStatusPanel";
import { SkeletonRows } from "../TableSkeleton";
import Pagination from "../Pagination";
import { usePagination } from "../../hooks/usePagination";

const STATUS_STYLES = {
  Paid: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  Pending: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
  Failed: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  Refunded: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
};

const PaymentsTable = ({ onView, search = "", status = "All", method = "All" }) => {
  const { payments, updatePaymentStatus, loading } = usePayments();
  const [editingPayment, setEditingPayment] = useState(null);

  const handleStatusChange = (paymentId, newStatus) => {
    return updatePaymentStatus(paymentId, newStatus);
  };

  // Filter payments based on search, status, and method
  const filteredPayments = payments.filter((payment) => {
  const matchesSearch =
  String(payment.paymentId ?? "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  String(payment.orderId ?? "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  payment.customerName
    ?.toLowerCase()
    .includes(search.toLowerCase());
    
    const matchesStatus = status === "All" || payment.paymentStatus === status;
    const matchesMethod = method === "All" || payment.paymentMethod === method;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Pagination
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

  return (
    <div className="overflow-visible">
      <div className="overflow-x-auto overflow-y-visible -mx-3 px-3 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Payment ID
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Order ID
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Customer
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Amount
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Discount
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Tax
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Method
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <SkeletonRows rows={5} columns={9} />
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <CreditCard size={22} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      No Payments Found
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {search || status !== "All" || method !== "All"
                        ? "Try adjusting your search or filters"
                        : "Payment records will appear here once available"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedPayments.map((payment) => {
               
                return (
                  <tr
                    key={payment.paymentId || payment.orderId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-3 py-2 text-xs font-medium text-gray-900 dark:text-white">
                      {payment.paymentId || "-"}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600 dark:text-gray-400">
                    {payment.orderId}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">
                      {payment.customerName}
                    </td>
                    <td className="px-3 py-2">
                      <span className="font-semibold text-xs text-[#E8A843]">
                        ₹{payment.totalAmount}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs">
  {payment.discountAmount > 0 ? (
    <span className="text-red-500 dark:text-red-400">
      -₹{payment.discountAmount}
    </span>
  ) : (
    <span className="text-gray-400 dark:text-gray-500">—</span>
  )}
</td>
                    <td className="px-3 py-2 text-xs">
                      {payment.taxAmount > 0 ? (
                        <span className="text-gray-600 dark:text-gray-400">
                          +₹{payment.taxAmount}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-flex rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-400">
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            STATUS_STYLES[payment.paymentStatus]||
                            "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                          }`}
                        >
                          {payment.paymentStatus}
                        </span>
                        <button
                          onClick={() => setEditingPayment(payment)}
                          title="Update status"
                          className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                        >
                          <SquarePen size={13} />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-550 dark:text-gray-400">
                      {new Date(payment.orderDate).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && filteredPayments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredPayments.length}
          pageSize={5}
          label="payments"
        />
      )}

      <PaymentStatusPanel
        isOpen={!!editingPayment}
        payment={editingPayment}
        onClose={() => setEditingPayment(null)}
   onSave={(newStatus) =>
  editingPayment &&
  handleStatusChange(
    editingPayment.paymentId || editingPayment.orderId,
    newStatus
  )
}
      />
    </div>
  );
};

export default PaymentsTable;