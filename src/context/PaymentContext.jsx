import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getPayments,
  updatePaymentStatusApi,
} from "../api/paymentApi";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
  totalPayments: 0,
  paidPayments: 0,
  pendingPayments: 0,
  revenue: 0,
});
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);

    try {
      const res = await getPayments();

      if (res.data.success || res.data.isSuccess) {
  const data = res.data.data || {};

  setPayments(Array.isArray(data.payments) ? data.payments : []);

  setSummary(
    data.summary || {
      totalPayments: 0,
      paidPayments: 0,
      pendingPayments: 0,
      revenue: 0,
    }
  );
} else {
  setPayments([]);
  setSummary({
    totalPayments: 0,
    paidPayments: 0,
    pendingPayments: 0,
    revenue: 0,
  });
}

    } catch (error) {
      console.error(error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchPayments();
    }
  }, []);

  

  const getPaymentSummary = () => {
  const list = Array.isArray(payments) ? payments : [];
  return {
    total: list.length,
    paid: list.filter((p) => p.status === "Paid").length,
    pending: list.filter((p) => p.status === "Pending").length,
    revenue: list
      .filter((p) => p.paymentStatus === "Paid")
      .reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0),
  };
};

const getPaymentById = (id) => {
  const list = Array.isArray(payments) ? payments : [];
  return (
    list.find(
String(p.paymentId) === String(id) ||
String(p.orderId) === String(id)    ) || null
  );
};

  const updatePaymentStatus = async (id, status) => {
    setLoading(true);

    try {
      await updatePaymentStatusApi(id, status);

      await fetchPayments();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
     value={{
  payments,
  summary,
  loading,
  fetchPayments,
  getPaymentSummary,
  getPaymentById,
  updatePaymentStatus,
}}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayments must be used within a PaymentProvider");
  }
  return context;
};