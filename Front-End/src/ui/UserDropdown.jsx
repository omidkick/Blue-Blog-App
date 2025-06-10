"use client";

// Imports
import { useState } from "react";
import {
  HiChevronDown,
  HiUserCircle,
  HiArrowRightOnRectangle,
  HiDocumentText,
} from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import useOutsideClick from "@/hooks/useOutsideClick";
import NavLink from "@/components/NavLink";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; 

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const ref = useOutsideClick(() => setIsOpen(false));

  const logoutHandler = async () => {
    await logout();
    router.push("/home");
  };

  if (!user) return null;

  // Framer Motion variants for smooth animation
  const dropdownVariants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    closed: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const chevronVariants = {
    open: { rotate: 180, transition: { duration: 0.4, ease: "easeOut" } },
    closed: { rotate: 0, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <div className="relative" ref={ref}>
      {/* User Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 p-2 rounded-lg text-secondary-500 hover:text-primary-700 hover:bg-secondary-200 transition md:text-base text-sm"
      >
        <HiUserCircle className="w-7 h-7" />
        
        {/* Animated Chevron */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={chevronVariants}
        >
          <HiChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* User Profile */}
      <motion.div
        className="absolute left-0 top-9 mt-2 w-52 bg-secondary-0 border border-secondary-200 rounded-xl shadow-lg p-4"
        role="menu"
        aria-hidden={!isOpen}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={dropdownVariants}
        style={{ zIndex: 20 }}
      >
        {/* User Info */}
        <div className="flex items-center gap-3 border-b border-secondary-200 pb-3 mb-3">
          <img
            src={user.avatarUrl || "/images/avatar.png"}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover border border-secondary-300"
          />
          <div className="flex flex-col overflow-hidden gap-y-1">
            <span className="font-bold text-secondary-900 truncate">
              {user.name}
            </span>
            <span className="text-sm text-secondary-500 truncate">
              {user.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink
            path="/profile"
            icon={HiUserCircle}
            className="text-sm hover:text-primary-600"
          >
            حساب کاربری
          </NavLink>

          <NavLink
            path="/profile/my-blogs"
            icon={HiDocumentText}
            className="text-sm hover:text-primary-600"
          >
            بلاگ‌ های من
          </NavLink>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 text-sm text-error hover:text-error-700 transition"
          >
            <HiArrowRightOnRectangle className="w-5 h-5" /> خروج
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default UserDropdown;
