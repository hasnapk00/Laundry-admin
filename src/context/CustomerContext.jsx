import React, { createContext, useContext, useState } from "react";
import mockData from "../mock-data.json"


const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call to fetch only logged-in customers (e.g. axios.get("/api/customers/logged-in"))
      await new Promise((resolve) => setTimeout(resolve, 500));
            setCustomers(mockData.customers);
    
    } catch (error) {
      console.error("Failed to fetch logged-in customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerById = (id) => {
    return customers.find((c) => String(c.id) === String(id)) || null;
  };


  return (
    <CustomerContext.Provider
      value={{
        customers: customers.filter((c) => c.isLoggedIn),
        loading,
        fetchCustomers,
        getCustomerById,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};
