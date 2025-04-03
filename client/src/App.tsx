import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AppLayout from "@/pages/app-layout";
import Home from "@/pages/home";
import { 
  DashboardPage, 
  ChatPage,
  TasksPage,
  ProjectsPage,
  CalendarPage,
  ReportsPage,
  WorkspacePage,
  ProfilePage
} from "@/pages/dashboard-pages";
import { useEffect } from "react";

// Hash route handler - redirects hash routes to proper paths
function HashRouteHandler() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Convert hash to path and navigate
        const path = hash.replace('#', '/');
        setLocation(path);
      }
    };
    
    // Initial check for hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setLocation]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/tasks" component={TasksPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/workspace" component={WorkspacePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouteHandler />
      <AppLayout>
        <Router />
      </AppLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
