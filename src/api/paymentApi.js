import api from "./axios";

export const getPayments = () => api.get("/Payments");

export const getPaymentById = (id) =>
  api.get(`/Payments/${id}`);

export const updatePaymentStatusApi = (id, paymentStatus) =>
  api.patch(`/Payments/${id}/status`, {
    paymentStatus,
  });