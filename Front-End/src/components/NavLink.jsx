"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ path, children, icon: Icon, className = "", onClick }) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      onClick={onClick}
      className={`flex items-center gap-2 py-2 hover:text-secondary-900 transition-all ease-out text-lg 
        ${isActive ? "text-primary-900 font-semibold" : "text-secondary-400"}
        ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </Link>
  );
}

export default NavLink;
