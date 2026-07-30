import api from "./axios";

export const getCoupons = () =>
  api.get("/admin/coupons");

export const getCouponById = (id) =>
  api.get(`/admin/coupons/${id}`);

export const createCoupon = (data) =>
  api.post("/admin/coupons", data);

export const updateCoupon = (id, data) =>
  api.put(`/admin/coupons/${id}`, data);

export const deleteCoupon = (id) =>
  api.delete(`/admin/coupons/${id}`);

export const updateCouponStatus = (id, status) =>
  api.patch(`/admin/coupons/${id}/status`, {
    status,
  });