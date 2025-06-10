"use client";

import { HiBars3 } from "react-icons/hi2";
import { useSidebar } from "@/context/SidebarContext";

function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden text-secondary-500 hover:text-secondary-700 transition"
    >
      <HiBars3 className="w-6 h-6" />
    </button>
  );
}

export default SidebarToggle;
