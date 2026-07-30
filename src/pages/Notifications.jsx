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

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [readFilter, setReadFilter] = useState("All");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = getFilteredNotifications(search, typeFilter, readFilter);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedNotifications,
  } = usePagination(filteredNotifications, 8);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, readFilter, setCurrentPage]);

  const unreadCount = getUnreadCount();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#E8A843] mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
        <h3 className="text-base font-semibold text-red-700 dark:text-red-400">
          Error Loading Notifications
        </h3>
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
            Notifications
          </h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#E8A843] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d49a3a] hover:shadow-md shadow-sm"
          >
            <Check size={16} />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3 shadow-sm">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-1.5 pl-9 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <div className="relative flex-1 sm:flex-none sm:w-36">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 pr-8 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>

            <div className="relative flex-1 sm:flex-none sm:w-36">
              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 pr-8 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
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
        return <CheckCircle className="text-green-600 dark:text-green-400" size={20} />;
      case "error":
        return <AlertCircle className="text-red-600 dark:text-red-400" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={20} />;
      case "info":
        return <Info className="text-blue-600 dark:text-blue-400" size={20} />;
      default:
        return <Bell className="text-gray-600 dark:text-gray-400" size={20} />;
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
      className={`rounded-lg border-2 p-3 transition-all duration-200 ${getTypeColor()} ${
        !read ? "shadow-md" : "shadow-sm"
      } ${link ? "cursor-pointer hover:shadow-md" : ""}`}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="mt-0.5 flex-shrink-0">{getTypeIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={`truncate text-sm font-semibold ${
                  read
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-900 dark:text-white font-bold"
                }`}
              >
                {title}
              </h3>
              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-500">
                {formatTime(timestamp)}
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              {!read && <div className="h-2.5 w-2.5 rounded-full bg-[#E8A843]"></div>}
              {link && (
                <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
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
  <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 py-12 px-4">
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-3">
        <Bell size={26} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="mt-3 text-base font-semibold text-gray-700 dark:text-gray-300">
        No Notifications Found
      </h3>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
        Try adjusting your filters or search criteria
      </p>
    </div>
  </div>
);

export default Notifications;