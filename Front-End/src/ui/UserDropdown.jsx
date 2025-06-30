"use client";

// Imports
import { useState } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiDocumentText,
  HiUserCircle,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import useOutsideClick from "@/hooks/useOutsideClick";
import NavLink from "@/components/NavLink";

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const ref = useOutsideClick(() => setIsOpen(false));

  const logoutHandler = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      {/* User Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 p-2 rounded-lg text-secondary-500 hover:text-primary-700 hover:bg-secondary-200 transition md:text-base text-sm"
      >
        <HiUserCircle className="w-7 h-7" />
        <HiChevronDown
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.4s ease-in-out",
          }}
          className="w-4 h-4"
        />
      </button>

      {/* User Profile */}
      <div
        className={`
          absolute left-0 top-9 mt-2 w-52 bg-secondary-0 border border-secondary-200 rounded-xl shadow-lg p-4
          transition-opacity duration-400
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
          !z-20
        `}
        role="menu"
        aria-hidden={!isOpen}
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
      </div>
    </div>
  );
}

export default UserDropdown;
