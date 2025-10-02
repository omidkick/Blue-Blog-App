"use client";

import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/ui/Sidebar";
import { navLinks } from "./Header";

export default function SidebarWrapper() {
  const { user } = useAuth();
  return <Sidebar user={user} navLinks={navLinks} />;
}
