"use client";

// Imports
import {
  getUserApi,
  logoutApi,
  signinApi,
  signupApi,
} from "@/services/authService";
import { useRouter } from "next/navigation";
import { createContext, useReducer, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNotifications } from "./NotificationContext";

// Context
const AuthContext = createContext();

// initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "signin":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "signup":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      throw new Error("Unknown action!");
  }
};

// Provider
export default function AuthProvider({ children }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  // Get notification functions
  const {
    addSigninNotification,
    addSignupNotification,
    clearAllNotifications,
  } = useNotifications();

  // !!!!!!  Actions:  !!!!!!
  // signin action
  async function signin(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      addSigninNotification(user.email || values.email);
      toast.success(message);
      router.replace("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  // signup action
  async function signup(values) {
    dispatch({ type: "loading" });

    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      addSignupNotification(user.email || values.email);
      toast.success(message);
      router.replace("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  // get user
  async function getUser() {
    dispatch({ type: "loading" });

    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
    }
  }

  // logout
  async function logout() {
    try {
      await logoutApi();

      // Clear all notifications on logout
      clearAllNotifications();

      router.push("/");
      dispatch({ type: "logout" });
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getUser();
    }

    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        signin,
        signup,
        getUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
