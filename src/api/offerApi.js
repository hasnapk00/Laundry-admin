import api from "./axios";

export const getOffers = () =>
  api.get("/Offers");

export const getOfferById = (id) =>
  api.get(`/Offers/${id}`);

export const createOffer = (data) =>
  api.post("/Offers", data);

export const updateOffer = (id, data) =>
  api.put(`/Offers/${id}`, data);

export const deleteOffer = (id) =>
  api.delete(`/Offers/${id}`);