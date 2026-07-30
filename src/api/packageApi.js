import api from "./axios";

export const getPackages = () =>
  api.get("/Packages");

export const getPackageById = (id) =>
  api.get(`/Packages/${id}`);

export const createPackage = (data) =>
  api.post("/Packages", data);

export const updatePackage = (id, data) =>
  api.put(`/Packages/${id}`, data);

export const deletePackage = (id) =>
  api.delete(`/Packages/${id}`);