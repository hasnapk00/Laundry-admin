import React, { createContext, useContext, useEffect, useState } from "react";
import mockData from "../mock-data.json"


const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.get("/api/payments"))
      await new Promise((resolve) => setTimeout(resolve, 500));
            setPayments(mockData.payments);

    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();   // ← load once when the app/provider mounts
  }, []);

  const addPayment = async (paymentData) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.post("/api/payments", paymentData))
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newPayment = {
        ...paymentData,
        id: payments.length + 1,
        paymentId: `PAY${String(payments.length + 1).padStart(3, "0")}`,
        date: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      setPayments((prev) => [newPayment, ...prev]);
      return newPayment;
    } catch (error) {
      console.error("Failed to add payment:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPaymentSummary = () => {
    // Calculates summary statistics based on current payments list
    const summary = {
      total: payments.length,
      paid: payments.filter((p) => p.status === "Paid").length,
      pending: payments.filter((p) => p.status === "Pending").length,
      revenue: payments
        .filter((p) => p.status === "Paid")
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0),
    };
    return summary;
  };

  const getPaymentById = (id) => {
    return payments.find((p) => String(p.id) === String(id) || String(p.paymentId) === String(id)) || null;
  };

  const updatePaymentStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.patch(`/api/payments/${id}`, { status: newStatus }))
      await new Promise((resolve) => setTimeout(resolve, 300));
      setPayments((prev) =>
        prev.map((p) =>
          String(p.id) === String(id) ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        loading,
        fetchPayments,
        addPayment,
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