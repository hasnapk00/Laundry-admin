import React, { createContext, useContext, useState } from "react";
import mockData from "../mock-data.json"


const PickupDeliveryContext = createContext();

export const PickupDeliveryProvider = ({ children }) => {
  const [pickups, setPickups] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.get("/api/schedules"))
      await new Promise((resolve) => setTimeout(resolve, 500));
            setPickups(mockData.pickups);
                  setDeliveries(mockData.deliveries);


    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPickupDeliveryById = (id) => {
    // pickups and deliveries each have their own numeric `id` sequence, so a
    // plain numeric id is ambiguous between the two lists. Match on the
    // unique pickup_id / delivery_id (e.g. "PU2005" / "DL3005") instead,
    // falling back to numeric id only if that's what was passed in.
    const pickup = pickups.find(
      (p) => p.pickup_id === id || String(p.id) === String(id)
    );
    if (pickup) return { ...pickup, type: "pickup" };

    const delivery = deliveries.find(
      (d) => d.delivery_id === id || String(d.id) === String(id)
    );
    if (delivery) return { ...delivery, type: "delivery" };

    return null;
  };

  const updatePickupStatus = async (id, status) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.patch(`/api/pickups/${id}`, { status }))
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPickups((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, status } : p))
      );
      return true;
    } catch (error) {
      console.error("Failed to update pickup status:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (id, status) => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.patch(`/api/deliveries/${id}`, { status }))
      await new Promise((resolve) => setTimeout(resolve, 500));
      setDeliveries((prev) =>
        prev.map((d) => (String(d.id) === String(id) ? { ...d, status } : d))
      );
      return true;
    } catch (error) {
      console.error("Failed to update delivery status:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PickupDeliveryContext.Provider
      value={{
        pickups,
        deliveries,
        loading,
        fetchSchedules,
        getPickupDeliveryById,
        updatePickupStatus,
        updateDeliveryStatus,
      }}
    >
      {children}
    </PickupDeliveryContext.Provider>
  );
};

export const usePickupDelivery = () => {
  const context = useContext(PickupDeliveryContext);
  if (!context) {
    throw new Error(
      "usePickupDelivery must be used within a PickupDeliveryProvider"
    );
  }
  return context;
};