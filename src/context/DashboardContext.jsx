import { createContext, useContext, useMemo } from "react";
import { useOrders } from "./OrderContext";
import { usePayments } from "./PaymentContext";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { orders } = useOrders();
  const { payments, getPaymentSummary } = usePayments();

  const dashboardData = useMemo(() => {
    // Orders
    const totalOrders = orders?.length || 0;

    const pendingOrders = orders.filter(
      (o) => o.status === "Pending"
    ).length;

    const completedOrders = orders.filter(
      (o) =>
        o.status === "Delivered" ||
        o.status === "Completed" ||
        o.status === "Ready"
    ).length;

    const processingOrders =
      totalOrders - pendingOrders - completedOrders;

    // Revenue
    const paymentSummary = getPaymentSummary();

    const monthlyRevenue = [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
      { month: "Mar", revenue: 0 },
      { month: "Apr", revenue: 0 },
      { month: "May", revenue: 0 },
      { month: "Jun", revenue: 0 },
      { month: "Jul", revenue: 0 },
      { month: "Aug", revenue: 0 },
      { month: "Sep", revenue: 0 },
      { month: "Oct", revenue: 0 },
      { month: "Nov", revenue: 0 },
      { month: "Dec", revenue: 0 },
    ];

    payments?.forEach((payment) => {
      if (payment.status !== "Paid") return;

      const amount = Number(payment.amount) || 0;

      const date = new Date(payment.date);

      if (!isNaN(date.getTime())) {
        const month = date.toLocaleString("en-US", {
          month: "short",
        });

        const bucket = monthlyRevenue.find(
          (m) => m.month === month
        );

        if (bucket) bucket.revenue += amount;
      }
    });

    const orderStatusChart = [
      {
        name: "Completed",
        value: completedOrders,
      },
      {
        name: "Pending",
        value: pendingOrders,
      },
      {
        name: "Processing",
        value: processingOrders,
      },
    ];

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      processingOrders,
      paymentSummary,
      monthlyRevenue,
      orderStatusChart,
    };
  }, [orders, payments, getPaymentSummary]);

  return (
    <DashboardContext.Provider value={dashboardData}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
};