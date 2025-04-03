import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useSidebar } from "@/hooks/use-sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [currentSection, setCurrentSection] = useState("Dashboard");
  const { sidebarState } = useSidebar();
  
  useEffect(() => {
    // Listen for hash changes to update the current section
    const handleHashChange = () => {
      const hash = window.location.hash || "#dashboard";
      const sectionName = hash.substring(1);
      setCurrentSection(sectionName.charAt(0).toUpperCase() + sectionName.slice(1));
    };
    
    // Initial call
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentSection} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6" id="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
