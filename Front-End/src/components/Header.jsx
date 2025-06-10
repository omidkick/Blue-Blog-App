"use client";

// Imports
import DarkModeToggle from "@/ui/DarkModeToggle";
import Sidebar from "@/ui/Sidebar";
import SidebarToggle from "@/ui/SidebarToggle";
import {
  HiArrowLeftOnRectangle,
  HiHome,
  HiDocumentText,
  HiInformationCircle,
} from "react-icons/hi2";
import Logo from "@/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import UserDropdown from "@/ui/UserDropdown";
import NavLink from "./NavLink";

// Navbar Links
export const navLinks = [
  { id: 1, children: "خانه", path: "/home", icon: HiHome },
  { id: 2, children: "بلاگ ها", path: "/blogs", icon: HiDocumentText },
  { id: 3, children: "درباره ما", path: "/about", icon: HiInformationCircle },
];
function Header() {
  const { user, isLoading } = useAuth();
  return (
    <header
      className={`z-10 shadow-md mb-10 sticky top-0 transition-all duration-200 border-b border-b-secondary-300 bg-secondary-100/90 rounded-lg ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav className="container xl:max-w-screen-xl flex items-center justify-between py-2 text-secondary-400">
        {/* Right Side - Sidebar toggle + Navigation */}
        <div className="flex items-center gap-x-4">
          {/* Desktop Logo */}
          <NavLink path="/" className="hidden md:block ml-4">
            <Logo />
          </NavLink>

          {/* Sidebar toggle (Mobile)  */}
          <SidebarToggle />

          {/* Mobile Logo */}
          <NavLink path="/" className="md:hidden">
            <img src="/images/Logo.png" alt="Logo" className="h-7 w-7" />
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-x-8">
            {navLinks.map((navLink) => (
              <li key={navLink.id}>
                <NavLink path={navLink.path} icon={navLink.icon}>
                  {navLink.children}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Left Side: Dark mode + UserIcon */}
        <ul className="flex items-center gap-x-6">
          <ul className="flex items-center gap-x-4 ">
            {/* Dark/light mode */}
            <li className="flex items-center">
              <DarkModeToggle />
            </li>
            <li>
              {user ? (
                // User avatar
                <UserDropdown />
              ) : (
                <NavLink
                  path="/signin"
                  className="btn btn--primary hover:text-white text-white flex items-center justify-center gap-2 text-sm md:text-base "
                >
                  <HiArrowLeftOnRectangle className="w-5 h-5" />
                  ورود
                </NavLink>
              )}
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
