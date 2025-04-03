import { useState, useEffect } from "react";
import { Dashboard } from "@/components/dashboard";
import { Chat } from "@/components/chat";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  
  useEffect(() => {
    // Listen for hash changes to update the active section
    const handleHashChange = () => {
      const hash = window.location.hash || "#dashboard";
      setActiveSection(hash.substring(1));
    };
    
    // Initial call
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  return (
    <>
      <div className={activeSection === "dashboard" ? "" : "hidden"}>
        <Dashboard />
      </div>
      
      <div className={activeSection === "chat" ? "h-full" : "hidden"}>
        <Chat />
      </div>
      
      <div className={activeSection === "tasks" ? "" : "hidden"}>
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <p>Tasks section content would appear here.</p>
      </div>
      
      <div className={activeSection === "projects" ? "" : "hidden"}>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <p>Projects section content would appear here.</p>
      </div>
      
      <div className={activeSection === "calendar" ? "" : "hidden"}>
        <h2 className="text-2xl font-bold mb-4">Calendar</h2>
        <p>Calendar section content would appear here.</p>
      </div>
      
      <div className={activeSection === "reports" ? "" : "hidden"}>
        <h2 className="text-2xl font-bold mb-4">Reports</h2>
        <p>Reports section content would appear here.</p>
      </div>
    </>
  );
}
