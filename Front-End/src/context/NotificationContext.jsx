"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";

// Context
const NotificationContext = createContext();

// Initial state
const initialState = {
  notifications: [],
  unreadCount: 0,
  commentNotifications: [], // New: for comment-specific notifications
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      const newNotification = {
        id: Date.now() + Math.random(),
        ...action.payload,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };

    case "ADD_COMMENT_NOTIFICATIONS":
      const commentNotifications = action.payload.map((comment, index) => ({
        id: `comment-${comment.id || `temp-${index}`}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "comment",
        title: "نظر جدید در انتظار تأیید",
        message: comment.body ? `${comment.body.substring(0, 50)}${comment.body.length > 50 ? '...' : ''}` : "نظر جدید دریافت شده",
        commentId: comment.id,
        commentBody: comment.body,
        userName: comment.user?.name || comment.name || "کاربر ناشناس",
        userEmail: comment.user?.email || comment.email,
        postTitle: comment.post?.title,
        timestamp: comment.created_at || new Date().toISOString(),
        isRead: false,
        icon: "💬",
        priority: "medium",
        status: comment.status,
        isAnswer: !!comment.parent_id, // Check if it's an answer to another comment
        parentComment: comment.parent_id,
      }));
      
      return {
        ...state,
        notifications: [...commentNotifications, ...state.notifications],
        commentNotifications,
        unreadCount: state.unreadCount + commentNotifications.length,
      };

    case "UPDATE_COMMENT_NOTIFICATIONS":
      const updatedCommentNotifications = action.payload.map((comment, index) => ({
        id: `comment-${comment.id || `temp-${index}`}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "comment",
        title: comment.status === 1 ? "نظر جدید در انتظار تأیید" : "نظر تأیید شده",
        message: comment.content.text ? `${comment.content.text.substring(0, 50)}${comment.content.text.length > 50 ? '...' : ''}` : "نظر دریافت شده",
        commentId: comment.id,
        commentBody: comment.body,
        userName: comment.user?.name || comment.name || "کاربر ناشناس",
        userEmail: comment.user?.email || comment.email,
        postTitle: comment.post?.title,
        timestamp: comment.createdAt || new Date().toISOString(),
        isRead: false,
        icon: comment.status === 1 ? "💬" : "✅",
        priority: comment.status === 1 ? "medium" : "low",
        status: comment.status,
        isAnswer: !!comment.parent_id,
        parentComment: comment.parent_id,
      }));

      // Only update if there are actual changes
      const currentCommentIds = state.commentNotifications.map(n => n.commentId).sort();
      const newCommentIds = updatedCommentNotifications.map(n => n.commentId).sort();
      
      if (JSON.stringify(currentCommentIds) === JSON.stringify(newCommentIds)) {
        return state; // No changes, return current state
      }

      // Remove old comment notifications and add updated ones
      const filteredNotifications = state.notifications.filter(n => n.type !== "comment");
      
      return {
        ...state,
        notifications: [...updatedCommentNotifications, ...filteredNotifications],
        commentNotifications: updatedCommentNotifications,
        unreadCount: state.unreadCount - state.commentNotifications.filter(n => !n.isRead).length + updatedCommentNotifications.length,
      };

    case "MARK_AS_READ":
      const notification = state.notifications.find(n => n.id === action.payload);
      const wasUnread = notification && !notification.isRead;
      
      return {
        ...state,
        notifications: state.notifications.map((notif) =>
          notif.id === action.payload ? { ...notif, isRead: true } : notif
        ),
        commentNotifications: state.commentNotifications.map((notif) =>
          notif.id === action.payload ? { ...notif, isRead: true } : notif
        ),
        unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      };

    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notif) => ({
          ...notif,
          isRead: true,
        })),
        commentNotifications: state.commentNotifications.map((notif) => ({
          ...notif,
          isRead: true,
        })),
        unreadCount: 0,
      };

    case "REMOVE_NOTIFICATION":
      const notificationToRemove = state.notifications.find((n) => n.id === action.payload);
      const isUnread = notificationToRemove && !notificationToRemove.isRead;
      
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
        commentNotifications: state.commentNotifications.filter(
          (notif) => notif.id !== action.payload
        ),
        unreadCount: isUnread ? state.unreadCount - 1 : state.unreadCount,
      };

    case "CLEAR_ALL":
      return {
        notifications: [],
        commentNotifications: [],
        unreadCount: 0,
      };

    case "LOAD_NOTIFICATIONS":
      const loadedNotifications = action.payload?.notifications || [];
      const loadedCommentNotifications = action.payload?.commentNotifications || [];
      
      return {
        notifications: loadedNotifications,
        commentNotifications: loadedCommentNotifications,
        unreadCount: loadedNotifications.filter((n) => !n.isRead).length,
      };

    default:
      return state;
  }
};

// Provider
export default function NotificationProvider({ children }) {
  const [{ notifications, unreadCount, commentNotifications }, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  // Load notifications from memory when component mounts
  useEffect(() => {
    const savedData = window.notificationStore || {};
    dispatch({ 
      type: "LOAD_NOTIFICATIONS", 
      payload: {
        notifications: savedData.notifications || [],
        commentNotifications: savedData.commentNotifications || []
      }
    });
  }, []);

  // Save to memory whenever notifications change
  useEffect(() => {
    window.notificationStore = {
      notifications,
      commentNotifications
    };
  }, [notifications, commentNotifications]);

  // Actions - Wrap with useCallback to prevent recreation on every render
  const addNotification = useCallback((notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  }, []);

  const addSigninNotification = useCallback((userEmail) => {
    addNotification({
      type: "signin",
      title: "ورود موفق",
      message: `شما با موفقیت وارد شدید.`,
      userEmail,
      icon: "🔐",
      priority: "high",
    });
  }, [addNotification]);

  const addSignupNotification = useCallback((userEmail) => {
    addNotification({
      type: "signup",
      title: "ثبت‌نام موفق",
      message: `حساب کاربری شما با موفقیت ایجاد شد .`,
      userEmail,
      icon: "🎉",
      priority: "high",
    });
  }, [addNotification]);

  const addCommentNotifications = useCallback((comments) => {
    if (comments && comments.length > 0) {
      dispatch({ type: "ADD_COMMENT_NOTIFICATIONS", payload: comments });
    }
  }, []);

  const updateCommentNotifications = useCallback((comments) => {
    dispatch({ type: "UPDATE_COMMENT_NOTIFICATIONS", payload: comments });
  }, []);

  const markAsRead = useCallback((id) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  }, []);

  const clearAllNotifications = useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
    delete window.notificationStore;
  }, []);

  // Get counts by type
  const getNotificationCounts = useCallback(() => {
    const commentCount = notifications.filter(n => n.type === "comment" && !n.isRead).length;
    const signinCount = notifications.filter(n => n.type === "signin" && !n.isRead).length;
    const signupCount = notifications.filter(n => n.type === "signup" && !n.isRead).length;
    
    return {
      total: unreadCount,
      comments: commentCount,
      signin: signinCount,
      signup: signupCount,
    };
  }, [notifications, unreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        commentNotifications,
        addNotification,
        addSigninNotification,
        addSignupNotification,
        addCommentNotifications,
        updateCommentNotifications,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        getNotificationCounts,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// Hook
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}