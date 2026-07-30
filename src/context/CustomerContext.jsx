import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import {
  getCustomers,
  getCustomerById as getCustomerApi,
} from "../api/customerApi";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({});
const [paymentSummary, setPaymentSummary] = useState({});
const [recentOrders, setRecentOrders] = useState([]);

 const fetchCustomers = async () => {
  setLoading(true);

  try {
    const res = await getCustomers();

    if (res.data.success || res.data.isSuccess) {
      const data = res.data.data;

      setCustomers(data.customers || []);
      setSummary(data.summary || {});
      setPaymentSummary(data.paymentSummary || {});
      setRecentOrders(data.recentOrders || []);
    } else {
      setCustomers([]);
    }
  } catch (error) {
    console.error("Failed to fetch customers:", error);

    setCustomers([]);
    setSummary({});
    setPaymentSummary({});
    setRecentOrders([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCustomers();
}, []);

const getCustomerById = async (id) => {
  try {
    const res = await getCustomerApi(id);

    if (res.data.success || res.data.isSuccess) {
      return res.data.data;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};


  return (
    <CustomerContext.Provider
    value={{
  customers,
  summary,
  paymentSummary,
  recentOrders,
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
