import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getOrders,
  getOrderById as getOrderApi,
  updateOrderStatusApi,
  getDashboardOrders
} from "../api/orderApi";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashboardOrders, setDashboardOrders] = useState([]);

const fetchOrders = async () => {
  setLoading(true);

  try {
    const res = await getOrders();

    console.log(res.data);

   if (res.data.success) {
  setOrders(res.data.data);
} else {
  setOrders([]);
}
  } catch (err) {
    console.error(err);
    setOrders([]);
  } finally {
    setLoading(false);
  }
};


const fetchDashboardOrders = async () => {
  try {
    const res = await getDashboardOrders();

    if (res.data.success) {
      setDashboardOrders(res.data.data);
    } else {
      setDashboardOrders([]);
    }
  } catch (err) {
    console.error(err);
    setDashboardOrders([]);
  }
};

useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    fetchOrders();
    fetchDashboardOrders();
  }
}, []);

const getOrderById = async (id) => {
  try {
    const res = await getOrderApi(id);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};



 const updateOrderStatus = async (id, status) => {
  setLoading(true);

  try {
    await updateOrderStatusApi(id, status);

    await fetchOrders();

    await fetchDashboardOrders();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    setLoading(false);
  }
};

  const getOrderTracking = (id) => {
    const order = getOrderById(id);
    if (!order) return [];
    
    // Stubs basic tracking timeline based on the status
    return [
      {
        status: order.status,
        updatedAt: "Just now",
        completed: true,
      }
    ];
  };

  return (
    <OrderContext.Provider
  value={{
    orders,
    dashboardOrders,
    loading,
    fetchOrders,
    fetchDashboardOrders,
    getOrderById,
    updateOrderStatus,
    getOrderTracking,
  }}
>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
