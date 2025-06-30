"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { BellIcon as BellSolidIcon } from "@heroicons/react/24/solid";
import { useNotifications } from "@/context/NotificationContext";
import { toPersianDigits } from "@/utils/numberFormatter";
import { useRouter } from "next/navigation";
import useComments from "@/hooks/useComments";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    updateCommentNotifications,
    getNotificationCounts,
  } = useNotifications();

  // Get all unconfirmed comments from CustomHook
  const { isLoading, comments = [] } = useComments();
  
  const flatComments = useMemo(() => {
    return comments.flatMap((comment) => [
      comment,
      ...(comment.answers || []),
    ]);
  }, [comments]);
  
  const unconfirmedComments = useMemo(() => {
    return flatComments.filter((c) => Number(c.status) === 1);
  }, [flatComments]);

  // Create a stable representation of unconfirmed comments for comparison
  const unconfirmedCommentsIds = useMemo(() => {
    return unconfirmedComments.map(c => c.id).sort().join(',');
  }, [unconfirmedComments]);

  // Update comment notifications when unconfirmed comments change
  useEffect(() => {
    if (!isLoading && unconfirmedComments.length >= 0) {
      updateCommentNotifications(unconfirmedComments);
    }
  }, [unconfirmedCommentsIds, isLoading, updateCommentNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return "همین الان";
    if (diffInMinutes < 60) return `${toPersianDigits(diffInMinutes)} دقیقه پیش`;
    if (diffInMinutes < 1440)
      return `${toPersianDigits(Math.floor(diffInMinutes / 60))} ساعت پیش`;
    return `${toPersianDigits(Math.floor(diffInMinutes / 1440))} روز پیش`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    // Handle different notification types
    if (notification.type === "comment") {
      // Navigate to comment management or specific post
      router.push(`/profile/comments${notification._id ? `?highlight=${notification._id}` : ''}`);
      setIsOpen(false);
    }
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

  // Get notification counts
  const counts = getNotificationCounts();

  // Sort notifications by priority and timestamp
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 1;
      const bPriority = priorityOrder[b.priority] || 1;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [notifications]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
        aria-label={`اعلان‌ها - ${unreadCount} خوانده نشده`}
      >
        {unreadCount > 0 ? (
          <BellSolidIcon className="w-6 h-6 text-primary-800" />
        ) : (
          <BellIcon className="w-6 h-6 text-secondary-600" />
        )}

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 99 ? "99+" : toPersianDigits(unreadCount)}
          </span>
        )}

        {/* Pulse animation for new comments */}
        {counts.comments > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-5 w-5 animate-ping opacity-75"></span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute -left-7 sm:left-0 mt-2 w-[320px] lg:w-[380px] bg-secondary-0 rounded-xl shadow-xl border border-secondary-200 z-50 max-h-[45rem] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-secondary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-800">اعلان‌ها</h3>
                {counts.comments > 0 && (
                  <p className="text-xs text-primary-600 mt-1">
                    {toPersianDigits(counts.comments)} نظر در انتظار تأیید
                  </p>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded-md hover:bg-primary-100 transition-colors"
                >
                  خواندن همه
                </button>
              )}
            </div>
          </div>

          {/* Notification Categories (if there are different types) */}
          {(counts.comments > 0 || counts.signin > 0 || counts.signup > 0) && (
            <div className="px-4 py-2 bg-secondary-50 border-b border-secondary-200">
              <div className="flex gap-2 text-xs">
                {counts.comments > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-secondary-100 text-primary-700 rounded-full">
                    💬 {toPersianDigits(counts.comments)}
                  </span>
                )}
                {counts.signin > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    🔐 {toPersianDigits(counts.signin)}
                  </span>
                )}
                {counts.signup > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    🎉 {toPersianDigits(counts.signup)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto lg:px-2">
            {sortedNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-secondary-500">
                <BellIcon className="w-12 h-12 mx-auto mb-2 text-secondary-300" />
                <p>اعلانی وجود ندارد</p>
              </div>
            ) : (
              sortedNotifications.slice(0, 4).map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`px-4 py-3 border-b border-secondary-100 cursor-pointer hover:bg-secondary-50 transition-colors my-3 ${
                    !notification.isRead
                      ? "bg-primary-50 border-r-4 border-r-primary-500"
                      : ""
                  } ${notification.type === 'comment' ? 'hover:bg-secondary-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      notification.type === 'comment' 
                        ? 'bg-blue-100 text-blue-600' 
                        : notification.type === 'signin' 
                        ? 'bg-green-100 text-green-600'
                        : notification.type === 'signup'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-primary-100 text-primary-600'
                    }`}>
                      {getNotificationIcon(notification)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-primary-800 text-sm truncate">
                          {notification.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-secondary-400 hover:text-secondary-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      <p className="text-secondary-600 text-sm mt-1 line-clamp-2">
                        {notification.message}
                      </p>

                      {/* Additional info for comments */}
                      {notification.type === 'comment' && (
                        <div className="mt-2 text-xs text-secondary-500">
                          {notification.userName && (
                            <p className="truncate">👤 {notification.userName}</p>
                          )}
                          {notification.postTitle && (
                            <p className="truncate mt-1">📄 {notification.postTitle}</p>
                          )}
                          {notification.isAnswer && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                              پاسخ
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <p className="text-secondary-400 text-xs">
                          {formatRelativeTime(notification.timestamp)}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {sortedNotifications.length > 0 && (
            <div className="px-4 py-3 border-t border-secondary-200 bg-secondary-50">
              <button
                onClick={() => {
                  router.push("/profile/notifications");
                  setIsOpen(false);
                }}
                className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm py-1 hover:bg-primary-100 rounded-md transition-colors"
              >
                مشاهده همه اعلان‌ها
                {sortedNotifications.length > 10 && (
                  <span className="text-xs text-secondary-500 mr-1">
                    ({toPersianDigits(sortedNotifications.length - 10)}+ بیشتر)
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}