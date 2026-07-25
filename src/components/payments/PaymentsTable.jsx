import { useState } from "react";
import { CreditCard, SquarePen } from "lucide-react";
import { usePayments } from "../../context/PaymentContext";
import { useOrders } from "../../context/OrderContext";
import PaymentStatusPanel from "./PaymentStatusPanel";
import { SkeletonRows } from "../TableSkeleton";

const STATUS_STYLES = {
  Paid: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  Pending: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
  Failed: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  Refunded: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
};

const PaymentsTable = ({ onView, search = "", status = "All", method = "All" }) => {
  const { payments, updatePaymentStatus, loading } = usePayments();
  const { getOrderById } = useOrders();
  const [editingPayment, setEditingPayment] = useState(null);

  const handleStatusChange = (paymentId, newStatus) => {
    return updatePaymentStatus(paymentId, newStatus);
  };

  // Filter payments based on search, status, and method
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.paymentId?.toLowerCase().includes(search.toLowerCase()) ||
      payment.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      payment.customer?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = status === "All" || payment.status === status;
    const matchesMethod = method === "All" || payment.method === method;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="overflow-visible">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full min-w-[1300px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Payment ID
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Order ID
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Customer
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Amount
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Discount
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Tax
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Method
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <SkeletonRows rows={5} columns={9} />
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <CreditCard size={28} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">
                      No Payments Found
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                      {search || status !== "All" || method !== "All"
                        ? "Try adjusting your search or filters"
                        : "Payment records will appear here once available"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => {
                const order = getOrderById(payment.orderId);
                const discount = order?.discount ?? 0;
                const tax = order?.tax ?? 0;

                return (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white">
                      {payment.paymentId}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400">
                      {payment.orderId}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300">
                      {payment.customer}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-semibold text-sm text-[#E8A843]">
                        ₹{payment.amount}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-sm">
                      {discount > 0 ? (
                        <span className="text-red-500 dark:text-red-400">
                          -₹{discount}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-sm">
                      {tax > 0 ? (
                        <span className="text-gray-600 dark:text-gray-400">
                          +₹{tax}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            STATUS_STYLES[payment.status] ||
                            "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                        <button
                          onClick={() => setEditingPayment(payment)}
                          title="Update status"
                          className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                        >
                          <SquarePen size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-sm text-gray-550 dark:text-gray-400">
                      {payment.date}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <PaymentStatusPanel
        isOpen={!!editingPayment}
        payment={editingPayment}
        onClose={() => setEditingPayment(null)}
        onSave={(newStatus) =>
          editingPayment && handleStatusChange(editingPayment.id, newStatus)
        }
      />
    </div>
  );
};

export default PaymentsTable;