import { createContext, useContext, useState, useEffect } from "react";

type SidebarState = "expanded" | "collapsed";

interface SidebarContextType {
  sidebarState: SidebarState;
  toggleSidebar: () => void;
  setSidebarState: (state: SidebarState) => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarState, setSidebarState] = useState<SidebarState>(() => {
    // Get from localStorage if available
    const storedState = localStorage.getItem("sidebar-state");
    return (storedState as SidebarState) || "expanded";
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    localStorage.setItem("sidebar-state", sidebarState);
  }, [sidebarState]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarState(sidebarState === "expanded" ? "collapsed" : "expanded");
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        toggleSidebar,
        setSidebarState,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
