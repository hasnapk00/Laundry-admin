import api from "./axios";

export const getOrders = () => api.get("/Orders");

export const getOrderById = (id) => api.get(`/Orders/${id}`);

export const updateOrderStatusApi = (id, status) =>
  api.patch(`/Orders/${id}/status`, {
    status,
  });

  export const getDashboardOrders = () => api.get("/Orders/Dashboard");