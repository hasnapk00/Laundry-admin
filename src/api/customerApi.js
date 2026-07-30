import api from "./axios";

export const getCustomers = () =>
  api.get("/Customers");

export const getCustomerById = (id) =>
  api.get(`/Customers/${id}`);