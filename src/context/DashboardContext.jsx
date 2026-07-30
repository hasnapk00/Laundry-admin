import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDashboard } from "../api/dashboardApi";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
const [stats, setStats] = useState({});
const [recentOrders, setRecentOrders] = useState([]);
const [revenueChart, setRevenueChart] = useState([]);
const [orderStatusSummary, setOrderStatusSummary] = useState({});
const [loading, setLoading] = useState(false);

const fetchDashboard = async () => {
  setLoading(true);

  try {
    const res = await getDashboard();

    if (res.data.success || res.data.isSuccess) {
      const data = res.data.data;

      setStats(data.stats || {});
      setRecentOrders(data.recentOrders || []);
      setRevenueChart(data.revenueChart || []);
      setOrderStatusSummary(data.orderStatusSummary || {});
    }
  } catch (err) {
    console.error("Dashboard Error:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDashboard();
}, []);
  return (
<DashboardContext.Provider
  value={{
    stats,
    recentOrders,
    revenueChart,
    orderStatusSummary,
    loading,
    fetchDashboard,
  }}
>      {children}
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