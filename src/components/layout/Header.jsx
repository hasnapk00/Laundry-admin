import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNotifications } from "../../context/NotificationsContext";
import { useNavigate } from "react-router-dom";


export default function Header({ setIsSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const { notifications, getUnreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const hour = new Date().getHours();
  const unreadCount = getUnreadCount();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17)
    greeting = "Good Afternoon";

  if (hour >= 17)
    greeting = "Good Evening";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get recent unread notifications (max 3)
  const recentUnreadNotifications = notifications
    .filter((n) => !n.read)
    .slice(0, 3);

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
  };

  const handleViewAll = () => {
    setShowNotificationDropdown(false);
    navigate("/notifications");
  };

  return (
    <header className="h-16 md:h-16 bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-gray-800/80 px-4 md:px-6 flex items-center justify-between transition-colors duration-200">
      {/* Left */}

      <div className="flex items-center gap-3">

        {/* Mobile Menu */}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <Menu size={20} />
        </button>

        <div>

          <h1 className="text-base md:text-lg font-bold leading-tight">
            {greeting} 👋
          </h1>

          <p className="hidden sm:block text-[11px] text-gray-500">
            Welcome back to Cleaneo
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2 md:gap-3">

        {/* Notification Dropdown */}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            className="relative w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-gray-600 dark:text-gray-300"
            title="Notifications"
          >
            <Bell size={16} />

            {/* Unread Badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Menu */}
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg z-50">
              {/* Header */}
              <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {recentUnreadNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentUnreadNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleNotificationClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      All caught up! No new notifications
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3">
                <button
                  onClick={handleViewAll}
                  className="w-full text-center text-sm font-medium text-[#E8A843] hover:text-[#d49a3a] transition-colors"
                >
                  View All Notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Profile */}

        <button className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-full bg-[#E8A843]/20 flex items-center justify-center">

            <UserCircle
              size={20}
              className="text-[#E8A843]"
            />

          </div>

          <div className="hidden md:block text-left">

            <p className="text-xs font-semibold leading-none">
              Admin
            </p>

            <p className="text-[10px] text-gray-550 dark:text-gray-400 mt-0.5">
              Administrator
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}

// ============== Notification Item ==============

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const { id, title, message, type, timestamp } = notification;

  const getTypeColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500";
      case "error":
        return "bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500";
      case "info":
        return "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500";
      default:
        return "bg-gray-50 dark:bg-gray-800/50 border-l-4 border-gray-500";
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
      onClick={() => onMarkAsRead(notification)}
      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${getTypeColor()}`}
    >
      <div className="flex gap-2">
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
            {title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {message}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {formatTime(timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};