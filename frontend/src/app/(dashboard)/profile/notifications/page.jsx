"use client";

import { useState, useMemo } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { toPersianDigits } from "@/utils/numberFormatter";
import { useRouter } from "next/navigation";
import {
  BellIcon,
  CheckIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  BellIcon as BellSolidIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function NotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getNotificationCounts,
  } = useNotifications();

  const [selectedFilter, setSelectedFilter] = useState("all"); // all, unread, read
  const [selectedType, setSelectedType] = useState("all"); // all, comment, signin, signup
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());
  const [showActions, setShowActions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get notification counts
  const counts = getNotificationCounts();

  // Filter and search notifications
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Filter by read status
    if (selectedFilter === "unread") {
      filtered = filtered.filter((n) => !n.isRead);
    } else if (selectedFilter === "read") {
      filtered = filtered.filter((n) => n.isRead);
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((n) => n.type === selectedType);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query) ||
          (n.userEmail && n.userEmail.toLowerCase().includes(query)) ||
          (n.userName && n.userName.toLowerCase().includes(query)) ||
          (n.postTitle && n.postTitle.toLowerCase().includes(query))
      );
    }

    // Sort by priority and timestamp
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 1;
      const bPriority = priorityOrder[b.priority] || 1;

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [notifications, selectedFilter, selectedType, searchQuery]);

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return "همین الان";
    if (diffInMinutes < 60)
      return `${toPersianDigits(diffInMinutes)} دقیقه پیش`;
    if (diffInMinutes < 1440)
      return `${toPersianDigits(Math.floor(diffInMinutes / 60))} ساعت پیش`;
    if (diffInMinutes < 10080)
      return `${toPersianDigits(Math.floor(diffInMinutes / 1440))} روز پیش`;

    return notificationTime.toLocaleDateString("fa-IR");
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Handle different notification types
    if (notification.type === "comment") {
      router.push(
        `/profile/comments${
          notification.commentId ? `?highlight=${notification.commentId}` : ""
        }`
      );
    }
  };

  // Handle notification selection
  const handleSelectNotification = (id) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.size === filteredNotifications.length) {
      setSelectedNotifications(new Set());
    } else {
      setSelectedNotifications(new Set(filteredNotifications.map((n) => n.id)));
    }
  };

  // Bulk actions
  const handleBulkMarkAsRead = () => {
    selectedNotifications.forEach((id) => {
      const notification = notifications.find((n) => n.id === id);
      if (notification && !notification.isRead) {
        markAsRead(id);
      }
    });
    setSelectedNotifications(new Set());
  };

  const handleBulkDelete = () => {
    selectedNotifications.forEach((id) => removeNotification(id));
    setSelectedNotifications(new Set());
  };

  // Get notification icon based on type
  const getNotificationIcon = (notification) => {
    const iconMap = {
      signin: "🔐",
      signup: "🎉",
      comment: notification.isAnswer ? "💬" : "📝",
    };

    return iconMap[notification.type] || notification.icon || "📢";
  };

  // Get notification styling based on type
  const getNotificationStyling = (notification) => {
    const styleMap = {
      comment: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        badge: "bg-blue-100 text-blue-700",
      },
      signin: {
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        badge: "bg-green-100 text-green-700",
      },
      signup: {
        bg: "bg-purple-50",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        badge: "bg-purple-100 text-purple-700",
      },
    };

    return (
      styleMap[notification.type] || {
        bg: "bg-primary-100",
        iconBg: "bg-primary-100",
        iconColor: "text-primary-600",
        badge: "bg-primary-100 text-primary-700",
      }
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedFilter("all");
    setSelectedType("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedFilter !== "all" || selectedType !== "all" || searchQuery;

  return (
    <div className="min-h-screen lg:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-secondary-0 rounded-xl sm:rounded-2xl shadow-sm border border-secondary-200 mb-4 sm:mb-6 overflow-hidden">
          {/* Title Section */}
          <div className="bg-secondary-500 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-0/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <BellSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-secondary-0 truncate">
                    اعلان‌ها
                  </h1>
                  <p className="text-secondary-300 text-xs sm:text-sm truncate">
                    {unreadCount > 0
                      ? `${toPersianDigits(unreadCount)} اعلان خوانده نشده`
                      : "همه اعلان‌ها خوانده شده"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-secondary-0/20 backdrop-blur-sm text-secondary-0 rounded-lg hover:bg-secondary-0/30 transition-all duration-200 text-xs sm:text-sm font-medium"
                  >
                    <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">خواندن همه</span>
                    <span className="sm:hidden">همه</span>
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="p-1.5 sm:p-2 text-secondary-50 hover:text-white hover:bg-secondary-0/20 rounded-lg transition-all duration-200"
                  >
                    <EllipsisVerticalIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {showActions && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowActions(false)}
                      />
                      <div className="absolute left-0 mt-2 w-40 sm:w-48 bg-secondary-0 rounded-xl shadow-lg border border-secondary-200 z-20 overflow-hidden">
                        <button
                          onClick={() => {
                            clearAllNotifications();
                            setShowActions(false);
                          }}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-right text-red-600 hover:bg-red-50 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm transition-colors"
                        >
                          <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          حذف همه اعلان‌ها
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stats - Mobile Optimized */}
            {(counts.comments > 0 ||
              counts.signin > 0 ||
              counts.signup > 0) && (
              <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2 flex-wrap">
                {counts.comments > 0 && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary-0/20 backdrop-blur-sm text-secondary-0 rounded-full text-xs">
                    <span>💬</span>
                    <span>{toPersianDigits(counts.comments)} نظر</span>
                  </div>
                )}
                {counts.signin > 0 && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary-0/20 backdrop-blur-sm text-secondary-0 rounded-full text-xs">
                    <span>🔐</span>
                    <span>{toPersianDigits(counts.signin)} ورود</span>
                  </div>
                )}
                {counts.signup > 0 && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary-0/20 backdrop-blur-sm text-secondary-0 rounded-full text-xs">
                    <span>🎉</span>
                    <span>{toPersianDigits(counts.signup)} ثبت‌نام</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search and Filters */}
          <div className="p-4 sm:p-6 border-b border-secondary-200">
            {/* Search */}
            <div className="relative mb-3 sm:mb-4">
              <label htmlFor="notification-search" className="sr-only">
                جستجو در اعلان‌ها
              </label>
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                id="notification-search"
                name="search"
                placeholder="جستجو در اعلان‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                className="w-full pr-9 sm:pr-10 pl-4 py-2.5 sm:py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  aria-label="پاک کردن جستجو"
                >
                  <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="sm:hidden mb-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full px-3 py-2 border border-secondary-200 rounded-lg text-sm bg-secondary-0"
              >
                <div className="flex items-center gap-2">
                  <FunnelIcon className="w-4 h-4 text-secondary-500" />
                  <span className="text-secondary-600 font-medium">فیلتر</span>
                  {hasActiveFilters && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-secondary-500 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
                <div className="hidden sm:flex items-center gap-2">
                  <FunnelIcon className="w-4 h-4 text-secondary-500" />
                  <span className="text-sm text-secondary-600 font-medium">
                    فیلتر:
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div>
                    <label htmlFor="filter-status" className="sr-only">
                      فیلتر بر اساس وضعیت
                    </label>
                    <select
                      id="filter-status"
                      name="filterStatus"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      autoComplete="off"
                      className="w-full sm:w-auto px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-secondary-0"
                    >
                      <option value="all">همه وضعیت‌ها</option>
                      <option value="unread">خوانده نشده</option>
                      <option value="read">خوانده شده</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="filter-type" className="sr-only">
                      فیلتر بر اساس نوع
                    </label>
                    <select
                      id="filter-type"
                      name="filterType"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      autoComplete="off"
                      className="w-full sm:w-auto px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-secondary-0"
                    >
                      <option value="all">همه انواع</option>
                      <option value="comment">نظرات</option>
                      <option value="signin">ورود</option>
                      <option value="signup">ثبت‌نام</option>
                    </select>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto px-3 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium text-center"
                  >
                    پاک کردن فیلتر
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.size > 0 && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-primary-50 border-b border-secondary-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-sm text-primary-700 font-medium">
                  {toPersianDigits(selectedNotifications.size)} اعلان انتخاب شده
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleBulkMarkAsRead}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    خوانده شده
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-secondary-0 rounded-xl sm:rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <BellIcon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-secondary-800 mb-2">
                {hasActiveFilters ? "اعلانی یافت نشد" : "اعلانی وجود ندارد"}
              </h3>
              <p className="text-secondary-500 text-sm max-w-md mx-auto">
                {hasActiveFilters
                  ? "فیلترها را تغییر دهید یا جستجوی دیگری امتحان کنید"
                  : "هنگامی که فعالیت جدیدی داشته باشید، اعلان‌ها اینجا نمایش داده می‌شوند"}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  پاک کردن فیلتر
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Select All */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-secondary-200 bg-secondary-50">
                <label
                  htmlFor="select-all"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="select-all"
                    name="selectAll"
                    checked={
                      selectedNotifications.size ===
                      filteredNotifications.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-600 bg-secondary-0 border-secondary-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-secondary-600 font-medium">
                    انتخاب همه ({toPersianDigits(filteredNotifications.length)})
                  </span>
                </label>
              </div>

              {/* Notifications Items */}
              <div className="divide-y divide-secondary-100">
                {filteredNotifications.map((notification, index) => {
                  const styling = getNotificationStyling(notification);
                  const isSelected = selectedNotifications.has(notification.id);

                  return (
                    <div
                      key={notification.id}
                      className={`relative transition-all duration-200 ${
                        !notification.isRead
                          ? "bg-primary-25 border-r-4 border-r-primary-500"
                          : "hover:bg-secondary-25"
                      } ${isSelected ? "bg-primary-50" : ""}`}
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* Checkbox */}
                          <label
                            htmlFor={`notification-${notification.id}`}
                            className="sr-only"
                          >
                            انتخاب اعلان {notification.title}
                          </label>
                          <input
                            type="checkbox"
                            id={`notification-${notification.id}`}
                            name={`notification-${notification.id}`}
                            checked={isSelected}
                            onChange={() =>
                              handleSelectNotification(notification.id)
                            }
                            className="mt-1 sm:mt-2 w-4 h-4 text-primary-600 bg-secondary-0 border-secondary-300 rounded focus:ring-primary-500 flex-shrink-0"
                          />

                          {/* Icon */}
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 ${styling.iconBg} ${styling.iconColor} rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0`}
                          >
                            {getNotificationIcon(notification)}
                          </div>

                          {/* Content */}
                          <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="font-semibold text-secondary-800 text-sm sm:text-base line-clamp-2">
                                {notification.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                {!notification.isRead && (
                                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                                )}
                                <span
                                  className={`px-2 py-1 ${styling.badge} rounded-full text-xs font-medium flex-shrink-0`}
                                >
                                  {notification.type === "signin"
                                    ? "ورود"
                                    : notification.type === "signup"
                                    ? "ثبت‌نام"
                                    : notification.type === "comment"
                                    ? "نظر"
                                    : notification.type}
                                </span>
                              </div>
                            </div>

                            <p className="text-secondary-600 mb-3 leading-relaxed text-sm sm:text-base line-clamp-3">
                              {notification.message}
                            </p>

                            {/* Additional info for comments */}
                            {notification.type === "comment" && (
                              <div className="space-y-1 mb-3 text-xs sm:text-sm text-secondary-500">
                                {notification.userName && (
                                  <div className="flex items-center gap-2">
                                    <span>👤</span>
                                    <span className="truncate">
                                      {notification.userName}
                                    </span>
                                  </div>
                                )}
                                {notification.postTitle && (
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span>📄</span>
                                    <span className="truncate">
                                      {notification.postTitle}
                                    </span>
                                  </div>
                                )}
                                {notification.isAnswer && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    <span>💬</span>
                                    <span>پاسخ</span>
                                  </span>
                                )}
                              </div>
                            )}

                            {notification.userEmail &&
                              notification.type !== "comment" && (
                                <p className="text-xs sm:text-sm text-secondary-500 mb-3 truncate">
                                  📧 {notification.userEmail}
                                </p>
                              )}

                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm text-secondary-400">
                                {formatRelativeTime(notification.timestamp)}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row items-center gap-1 flex-shrink-0">
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="p-1.5 sm:p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-all duration-200"
                                title="علامت‌گذاری به عنوان خوانده شده"
                              >
                                <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="p-1.5 sm:p-2 text-secondary-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                              title="حذف اعلان"
                            >
                              <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer Stats */}
        {notifications.length > 0 && (
          <div className="mt-4 sm:mt-6 bg-secondary-0 rounded-xl sm:rounded-2xl shadow-sm border border-secondary-200 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-secondary-600">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span>مجموع {toPersianDigits(notifications.length)} اعلان</span>
                {hasActiveFilters && (
                  <span>
                    نمایش {toPersianDigits(filteredNotifications.length)} مورد
                  </span>
                )}
              </div>
              <span>
                {unreadCount > 0
                  ? `${toPersianDigits(unreadCount)} خوانده نشده`
                  : "همه خوانده شده"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
