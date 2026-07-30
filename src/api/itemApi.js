import api from "./axios";

// Get all items
export const getItems = () =>
  api.get("/Items");

// Get dashboard summary
export const getItemsSummary = () =>
  api.get("/Items/Summary");

// Get single item
export const getItemById = (id) =>
  api.get(`/Items/${id}`);

// Get items by category
export const getItemsByCategory = (categoryId) =>
  api.get(`/Items/ByCategory/${categoryId}`);

// Create item
export const createItem = (formData) =>
  api.post("/Items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update item
export const updateItem = (id, formData) =>
  api.put(`/Items/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete item
export const deleteItem = (id) =>
  api.delete(`/Items/${id}`);

// Change status
export const changeItemStatus = (id, status) =>
  api.patch(`/Items/ChangeStatus/${id}`, {
    status,
  });