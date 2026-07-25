import React, { createContext, useContext, useState } from "react";
import mockData from "../mock-data.json"



const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.get("/api/services-and-categories"))
      await new Promise((resolve) => setTimeout(resolve, 500));
setCategories(mockData.categories);
setServices(mockData.services);

    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Category CRUD
  const addCategory = async (categoryData) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newCategory = {
        ...categoryData,
        id: categories.length + 1,
      };
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (error) {
      console.error("Failed to add category:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, data) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...data } : c))
      );
      return true;
    } catch (error) {
      console.error("Failed to update category:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete category:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Service CRUD
  const addService = async (serviceData) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newService = {
        ...serviceData,
        id: services.length + 1,
      };
      setServices((prev) => [...prev, newService]);
      return newService;
    } catch (error) {
      console.error("Failed to add service:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id, data) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s))
      );
      return true;
    } catch (error) {
      console.error("Failed to update service:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setServices((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete service:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        categories,
        services,
        loading,
        fetchServices,
        addCategory,
        updateCategory,
        deleteCategory,
        addService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
