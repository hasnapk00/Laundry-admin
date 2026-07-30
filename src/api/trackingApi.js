import api from "./axios";

export const getTracking = () =>
  api.get("/Tracking");

export const getTrackingByOrderId = (orderId) =>
  api.get(`/Tracking/${orderId}`);

export const updateTrackingStatus = (orderId, trackingStatus) =>
  api.patch(`/Tracking/${orderId}/status`, {
    trackingStatus,
  });