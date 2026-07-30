import api from "./axios";

export const getServices = () => api.get("/Services");

export const getServiceById = (id) =>
  api.get(`/Services/${id}`);

export const createService = (data) =>
  api.post("/Services", data);

export const updateService = (id, data) =>
  api.put(`/Services/${id}`, data);

export const deleteService = (id) =>
  api.delete(`/Services/${id}`);

export const getServicesDropdown = () =>
  api.get("/Services/dropdown");