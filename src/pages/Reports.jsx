import { useNavigate } from "react-router-dom";
import { useReports } from "../context/ReportsContext";
import ReportsHeader from "../components/reports/ReportsHeader";
import SummaryCards from "../components/reports/SummaryCards";
import MonthlyReportTable from "../components/reports/MonthlyReportTable";
import ServiceReportTable from "../components/reports/ServiceReportTable";
import PaymentReport from "../components/reports/PaymentReport";
import RevenueeTrendChart from "../components/reports/RevenueeTrendChart";
import { weeklyRevenue } from "../mock-data.json";

const Reports = () => {
  const navigate = useNavigate();

  const {
    loading,
    period,
    setPeriod,
    periodLabel,
    customRange,
    setCustomRange,
    filteredOrders,
    filteredPayments,
    previousOrders,
    previousPayments,
    monthlyRows,
    dailyRevenue,
    exportCsv,
    exportLabel,
    exportDisabled,
  } = useReports();

  return (
    <div className="space-y-6">
      <ReportsHeader
        periodLabel={periodLabel}
        period={period}
        onPeriodChange={setPeriod}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
        onExport={exportCsv}
        exportLabel={exportLabel}
        exportDisabled={exportDisabled}
      />

      <SummaryCards
        orders={filteredOrders}
        previousOrders={previousOrders}
        payments={filteredPayments}
        previousPayments={previousPayments}
        showTrend={period !== "all"}
        loading={loading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend Chart - Compact */}
        <div className="lg:col-span-1">
          <RevenueeTrendChart data={weeklyRevenue} compact />
        </div>

        {/* Service Report Table - Compact */}
        <div className="lg:col-span-1">
          <ServiceReportTable
            orders={filteredOrders}
            loading={loading}
            compact
          />
        </div>

        {/* Payment Report - Compact */}
        <div className="lg:col-span-1">
          <PaymentReport
            payments={filteredPayments}
            loading={loading}
            pie
            compact
          />
        </div>
      </div>

      <MonthlyReportTable
        months={monthlyRows}
        loading={loading}
        onRowClick={(month) => navigate(`/reports/month/${month.key}`)}
      />
    </div>
  );
};

export default Reports;