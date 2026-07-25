import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const NotificationsContext = createContext();

// Mock data - replace with actual API calls
const mockNotifications = [
  {
    id: 1,
    title: "Order Completed",
    message: "Order #ORD1001 has been completed and is ready for pickup.",
    type: "success",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    link: "/orders/ORD1001",
  },
  {
    id: 2,
    title: "Payment Failed",
    message: "Payment for order #ORD1002 failed. Please try again.",
    type: "error",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: false,
    link: "/orders/ORD1002",
  },
  {
    id: 3,
    title: "System Update",
    message: "System maintenance scheduled for tonight at 2:00 AM.",
    type: "info",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
    link: "/settings",
  },
  {
    id: 4,
    title: "New Service Available",
    message: "Express Delivery service is now available in your area.",
    type: "info",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    link: "/services",
  },
  {
    id: 5,
    title: "Urgent Attention",
    message: "Multiple failed delivery attempts for DL3001. Contact customer for confirmation.",
    type: "warning",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: false,
    link: "/pickup-delivery/DL3001",
  },
  {
    id: 6,
    title: "Pickup Scheduled",
    message: "Pickup PU2001 will be picked up tomorrow at 10:00 AM.",
    type: "success",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    read: true,
    link: "/pickup-delivery/PU2001",
  },
];

// Provider component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace with actual API call
      // const response = await fetch("/api/notifications");
      // const data = await response.json();
      // setNotifications(data);
      
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setNotifications(mockNotifications);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      // API call to mark as read
      // await fetch(`/api/notifications/${id}/read`, { method: "PUT" });
      
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Failed to mark as read:", err);
    }
  };

  // Mark notification as unread
  const markAsUnread = async (id) => {
    try {
      // API call to mark as unread
      // await fetch(`/api/notifications/${id}/unread`, { method: "PUT" });
      
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: false } : notif
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Failed to mark as unread:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      // API call to delete
      // await fetch(`/api/notifications/${id}`, { method: "DELETE" });
      
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Failed to delete notification:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      // API call to mark all as read
      // await fetch("/api/notifications/read-all", { method: "PUT" });
      
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (err) {
      setError(err.message);
      console.error("Failed to mark all as read:", err);
    }
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  // Get filtered notifications
  const getFilteredNotifications = (search, typeFilter, readFilter) => {
    return notifications.filter((notification) => {
      const matchesSearch =
        String(notification.title || "").toLowerCase().includes(search.toLowerCase()) ||
        String(notification.message || "").toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || notification.type === typeFilter;
      const matchesRead =
        readFilter === "All" ||
        (readFilter === "Unread" && !notification.read) ||
        (readFilter === "Read" && notification.read);
      return matchesSearch && matchesType && matchesRead;
    });
  };

  const value = {
    notifications,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAsUnread,
    deleteNotification,
    markAllAsRead,
    getUnreadCount,
    getFilteredNotifications,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Custom hook to use the context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};