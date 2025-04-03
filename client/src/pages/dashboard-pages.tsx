import { Dashboard } from "@/components/dashboard";
import { Chat } from "@/components/chat";
import { CalendarView } from "@/components/calendar";
import { TaskManagement } from "@/components/tasks";
import { ProjectsView } from "@/components/projects";
import { ReportsView } from "@/components/reports";

export function DashboardPage() {
  return <Dashboard />;
}

export function ChatPage() {
  return <Chat />;
}

export function TasksPage() {
  return <TaskManagement />;
}

export function ProjectsPage() {
  return <ProjectsView />;
}

export function CalendarPage() {
  return <CalendarView />;
}

export function ReportsPage() {
  return <ReportsView />;
}

export function WorkspacePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Workspace</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Workspace functionality will be implemented in a future update.
        </p>
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          User profile functionality will be implemented in a future update.
        </p>
      </div>
    </div>
  );
}