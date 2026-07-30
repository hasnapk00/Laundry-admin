import api from "./axios";

// Get all categories
export const getCategories = () =>
  api.get("/Categories");

// Get single category
export const getCategoryById = (id) =>
  api.get(`/Categories/${id}`);

// Create category
export const createCategory = (formData) =>
  api.post("/Categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update category
export const updateCategory = (id, formData) =>
  api.put(`/Categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete category
export const deleteCategory = (id) =>
  api.delete(`/Categories/${id}`);