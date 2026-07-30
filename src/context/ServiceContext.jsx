

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  getServices,
  createService,
  updateService as updateServiceApi,
  deleteService as deleteServiceApi,
} from "../api/serviceApi";

import {
  getCategories,
  createCategory,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
} from "../api/categoryApi";

import {
  getItems,
  createItem,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
} from "../api/itemApi";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

// const fetchData = async () => {
//       setLoading(true);

//     try {
//       const [categoryRes, serviceRes, itemRes] = await Promise.all([
//         getCategories(),
//         getServices(),
//         getItems(),
//       ]);

//       if (categoryRes.data.success || categoryRes.data.isSuccess) {
//         setCategories(categoryRes.data.data || []);
//       }

//       if (serviceRes.data.success || serviceRes.data.isSuccess) {
//         setServices(serviceRes.data.data || []);
//       }

//       if (itemRes.data.success || itemRes.data.isSuccess) {
//         setItems(itemRes.data.data || []);
//       }
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchData = async () => {
  setLoading(true);

  try {
    const categoryRes = await getCategories();
    console.log("Categories loaded");
    const serviceRes = await getServices();
    console.log("Services loaded");
    const itemRes = await getItems();
    console.log("Items loaded");

    if (categoryRes.data.success || categoryRes.data.isSuccess) {
      setCategories(categoryRes.data.data || []);
    }

    if (serviceRes.data.success || serviceRes.data.isSuccess) {
      setServices(serviceRes.data.data || []);
    }

    if (itemRes.data.success || itemRes.data.isSuccess) {
      setItems(itemRes.data.data || []);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------------
  // CATEGORY CRUD
  // -------------------------

  const addCategory = async (categoryData) => {
    setLoading(true);

    try {
      await createCategory(categoryData);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to add category:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, data) => {
    setLoading(true);

    try {
      await updateCategoryApi(id, data);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to update category:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // const deleteCategory = async (id) => {
  //   setLoading(true);

  //   try {
  //     await deleteCategoryApi(id);
  //     await fetchData();
  //     return true;
  //   } catch (error) {
  //     console.error("Failed to delete category:", error);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteCategory = async (id) => {
  setLoading(true);
  try {
    await deleteCategoryApi(id);
    await fetchData();
    return true;
  } catch (error) {
    const backendMsg = error.response?.data?.errors?.[0];
    if (backendMsg?.includes("REFERENCE constraint")) {
      alert("This category can't be deleted because it still has services linked to it. Please reassign or delete those services first.");
    } else {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category. Please try again.");
    }
    return false;
  } finally {
    setLoading(false);
  }
};

  // -------------------------
  // SERVICE CRUD
  // -------------------------

  const addService = async (serviceData) => {
    setLoading(true);

    try {
      await createService(serviceData);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to add service:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // const updateService = async (id, data) => {
  //   setLoading(true);

  //   try {
  //     await updateServiceApi(id, data);
  //     await fetchData();
  //     return true;
  //   } catch (error) {
  //     console.error("Failed to update service:", error);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateService = async (id, data) => {
  setLoading(true);

  try {
    await updateServiceApi(id, data);
    await fetchData();
    return true;
  } catch (error) {
    console.error("Failed to update service:", error.response?.data); // 👈 add this
    return false;
  } finally {
    setLoading(false);
  }
};

  const deleteService = async (id) => {
    setLoading(true);

    try {
      await deleteServiceApi(id);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to delete service:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // ITEM CRUD
  // -------------------------

  const addItem = async (itemData) => {
    setLoading(true);

    try {
      await createItem(itemData);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to add item:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, data) => {
    setLoading(true);

    try {
      await updateItemApi(id, data);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to update item:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);

    try {
      await deleteItemApi(id);
      await fetchData();
      return true;
    } catch (error) {
      console.error("Failed to delete item:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        categories,
        services,
        items,
        loading,
        fetchData,

        addCategory,
        updateCategory,
        deleteCategory,

        addService,
        updateService,
        deleteService,

        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error(
      "useServices must be used within a ServiceProvider"
    );
  }

  return context;
};