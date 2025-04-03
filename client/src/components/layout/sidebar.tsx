import { Link, useLocation } from "wouter";
import { Home, MessageSquare, CheckSquare, FolderKanban, Calendar, BarChart3, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { getInitials } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type WorkspaceItem = {
  name: string;
  color: string;
  initials: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: "Chat",
    href: "/chat",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <FolderKanban className="w-5 h-5" />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <BarChart3 className="w-5 h-5" />,
  },
];

const workspaces: WorkspaceItem[] = [
  { name: "Design Team", color: "bg-green-500", initials: "D" },
  { name: "Marketing", color: "bg-purple-500", initials: "M" },
  { name: "Engineering", color: "bg-blue-500", initials: "E" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { sidebarState, toggleSidebar, isMobile } = useSidebar();
  const isExpanded = sidebarState === "expanded";

  return (
    <div
      className={cn(
        "flex-shrink-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          {isExpanded && <h1 className="text-lg font-bold">ProcessPlan</h1>}
        </div>
        {isMobile ? (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <div
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md cursor-pointer",
                    location === item.href
                      ? "bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {item.icon}
                  {isExpanded && <span>{item.label}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {isExpanded && (
          <div className="px-4 mt-8 mb-4">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
                Workspaces
              </h3>
              <ul className="mt-2 space-y-1">
                {workspaces.map((workspace) => (
                  <li key={workspace.name}>
                    <Link href="/workspace">
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <div className={`w-5 h-5 rounded ${workspace.color} flex items-center justify-center text-white text-xs`}>
                          {workspace.initials}
                        </div>
                        <span className="text-sm">{workspace.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Theme Switcher */}
      {isExpanded && (
        <div className="flex justify-center p-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeSwitcher />
        </div>
      )}
      
      {/* Theme Switcher (Collapsed) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!isExpanded && <ThemeSwitcher />}
      </div>
    </div>
  );
}
