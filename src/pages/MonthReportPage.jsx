import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

import { useReports } from "../context/ReportsContext";
import SummaryCards from "../components/reports/SummaryCards";
import ServiceReportTable from "../components/reports/ServiceReportTable";
import PaymentReport from "../components/reports/PaymentReport";

import {
  formatMonthLabel,
  monthKeyToRange,
  toCsv,
  downloadCsv,
} from "../components/reports/Reportutils";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";

// Route: /reports/month/:key   e.g. /reports/month/2026-6
const MonthReportPage = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, getMonthOrders, getMonthPayments } = useReports();

  const label = useMemo(() => formatMonthLabel(monthKeyToRange(key).start), [key]);
  const monthOrders = useMemo(() => getMonthOrders(key), [key, getMonthOrders]);
  const monthPayments = useMemo(() => getMonthPayments(key), [key, getMonthPayments]);

  const exportMonthCsv = () => {
    const header = ["Order ID", "Customer", "Service", "Order Date", "Status", "Amount"];
    const rows = monthOrders.map((o) => [o.id, o.customer, o.service, o.orderDate, o.status, o.total]);
    downloadCsv(toCsv(header, rows), `month-report-${key}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/reports")}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <ArrowLeft size={15} />
            All Months
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {label} — Full Report
          </h1>
        </div>

        <button
          onClick={exportMonthCsv}
          disabled={!loading && monthOrders.length === 0}
          title={monthOrders.length === 0 ? "No orders this month" : undefined}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-4 py-2.5 text-sm font-medium text-white dark:text-[#231F20] shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40"
        >
          <Download size={16} />
          Export {label} CSV
        </button>
      </div>

      <SummaryCards
        orders={monthOrders}
        previousOrders={[]}
        payments={monthPayments}
        previousPayments={[]}
        showTrend={false}
        loading={loading}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ServiceReportTable orders={monthOrders} loading={loading} />
        <PaymentReport payments={monthPayments} loading={loading} />
      </div>

      <MonthOrdersTable orders={monthOrders} loading={loading} />
    </div>
  );
};

// ============== Full order list for the selected month ==============

const MonthOrdersTable = ({ orders, loading }) => {
  const pagination = usePagination(orders, 5);

  if (loading) {
    return (
      <div className="h-64 animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-zinc-800" />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
      <div className="border-b border-gray-100 dark:border-gray-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Orders</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Every order placed this month, {orders.length} total.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
          No orders this month.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  {["Order ID", "Customer", "Service", "Date", "Status", "Amount"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagination.paginatedData.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-gray-100 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {o.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {o.customer}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {o.service}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {o.orderDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {o.status}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      ₹{Number(o.total).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.setCurrentPage}
            totalItems={pagination.totalItems}
            pageSize={pagination.pageSize}
            label="orders"
          />
        </>
      )}
    </div>
  );
};

export default MonthReportPage;