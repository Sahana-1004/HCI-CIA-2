import { useContext } from "react";
import { useSidebar as useSidebarContext, SidebarContext } from "@/context/sidebar-context";

export const useSidebar = () => {
  try {
    return useSidebarContext();
  } catch (e) {
    // Return default values if context is not available
    return {
      sidebarState: "expanded",
      toggleSidebar: () => {},
      setSidebarState: () => {},
      isMobile: false
    };
  }
};
