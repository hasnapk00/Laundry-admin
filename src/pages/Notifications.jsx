import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useNotifications } from "../context/NotificationsContext";

const Notifications = () => {
  const navigate = useNavigate();
  const {
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
  } = useNotifications();

  // Filter states
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [readFilter, setReadFilter] = useState("All");

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Get filtered notifications
  const filteredNotifications = getFilteredNotifications(search, typeFilter, readFilter);

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedNotifications,
  } = usePagination(filteredNotifications, 8);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, readFilter, setCurrentPage]);

  const unreadCount = getUnreadCount();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E8A843] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading notifications...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5">
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
          Error Loading Notifications
        </h3>
        <p className="mt-2 text-sm text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 rounded-xl bg-[#E8A843] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d49a3a] hover:shadow-md shadow-sm"
          >
            <Check size={18} />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap lg:flex-nowrap">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            <div className="relative">
              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 pr-10 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onMarkAsUnread={markAsUnread}
              onDelete={deleteNotification}
              onNavigate={(notif) => {
                markAsRead(notif.id);
                if (notif.link) navigate(notif.link);
              }}
            />
          ))
        ) : (
          <EmptyNotifications />
        )}
      </div>

      {/* Pagination */}
      {filteredNotifications.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredNotifications.length}
          pageSize={8}
          label="notifications"
        />
      )}
    </div>
  );
};

// ============== Notification Card ==============

const NotificationCard = ({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onNavigate,
}) => {
  const { id, title, message, type, timestamp, read, link } = notification;

  const getTypeIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600 dark:text-green-400" size={24} />;
      case "error":
        return <AlertCircle className="text-red-600 dark:text-red-400" size={24} />;
      case "warning":
        return <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />;
      case "info":
        return <Info className="text-blue-600 dark:text-blue-400" size={24} />;
      default:
        return <Bell className="text-gray-600 dark:text-gray-400" size={24} />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-800";
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={() => link && onNavigate?.(notification)}
      className={`rounded-xl border-2 p-4 transition-all duration-200 ${getTypeColor()} ${
        !read ? "shadow-md" : "shadow-sm"
      } ${link ? "cursor-pointer hover:shadow-md" : ""}`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">{getTypeIcon()}</div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  read
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-900 dark:text-white font-bold"
                }`}
              >
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                {formatTime(timestamp)}
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              {/* Unread Badge */}
              {!read && (
                <div className="h-3 w-3 rounded-full bg-[#E8A843]"></div>
              )}
              {link && (
                <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
            {!read ? (
              <button
                onClick={() => onMarkAsRead(id)}
                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Mark as Read
              </button>
            ) : (
              <button
                onClick={() => onMarkAsUnread(id)}
                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Mark as Unread
              </button>
            )}
            <div className="text-gray-300 dark:text-gray-600">•</div>
            <button
              onClick={() => onDelete(id)}
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============== Empty State ==============

const EmptyNotifications = () => (
  <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 py-16 px-6">
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-4">
        <Bell size={32} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        No Notifications Found
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Try adjusting your filters or search criteria
      </p>
    </div>
  </div>
);

export default Notifications;