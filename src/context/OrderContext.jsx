import React, { createContext, useContext, useEffect, useState } from "react";
import mockData from "../mock-data.json"

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.get("/api/orders"))
      await new Promise((resolve) => setTimeout(resolve, 300));
      setOrders(mockData.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();   // ← load once when the app/provider mounts
  }, []);

  const getOrderById = (id) => {
    return orders.find((order) => order.id === id) || null;
  };



  const updateOrderStatus = async (id, status) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.patch(`/api/orders/${id}`, { status }))
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
      return true;
    } catch (error) {
      console.error("Failed to update order status:", error);
      throw error;
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
        loading,
        fetchOrders,
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
