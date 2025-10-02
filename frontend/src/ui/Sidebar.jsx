"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { AiOutlineClose } from "react-icons/ai";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import NavLink from "@/components/NavLink";
import Logo from "./Logo";
import useOutsideClick from "@/hooks/useOutsideClick";

function Sidebar({ navLinks, user }) {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setIsVisible(true); // Mount the component
      setTimeout(() => setIsAnimated(true), 10); // Let the DOM paint, then animate in
    } else {
      setIsAnimated(false); // Start closing animation
      setTimeout(() => setIsVisible(false), 500); // Unmount after transition ends
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const ref = useOutsideClick(() => {
    if (isSidebarOpen) closeSidebar();
  });

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-500
          ${
            isAnimated
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Sidebar */}
      <aside
        ref={ref}
        className={`fixed top-0 right-0 w-[65%] h-full bg-secondary-0 p-4 z-50 border-l border-secondary-300 shadow-lg md:hidden
          transform transition-transform duration-500
          ${isAnimated ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-secondary-300 pb-3 px-2 mb-4">
          <NavLink path="/" onClick={closeSidebar}>
            <Logo />
          </NavLink>
          <button
            onClick={closeSidebar}
            className="text-secondary-500 hover:text-error transition"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 mb-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              path={link.path}
              icon={link.icon}
              onClick={closeSidebar}
            >
              {link.children}
            </NavLink>
          ))}
        </nav>

        {/* Auth/Login */}
        <div className="mt-10">
          {user ? (
            <div className="flex items-center gap-3 border-b border-secondary-200 pb-3 mt-[30%]">
              <img
                src={user.avatarUrl || "/images/avatar.png"}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full object-cover border border-secondary-300"
              />
              <span className="font-bold text-secondary-900 truncate">
                {user.name}
              </span>
            </div>
          ) : (
            <NavLink
              path="/signin"
              className="btn btn--primary text-white flex items-center justify-center gap-2 hover:text-white"
              icon={HiArrowLeftOnRectangle}
              onClick={closeSidebar}
            >
              ورود
            </NavLink>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
