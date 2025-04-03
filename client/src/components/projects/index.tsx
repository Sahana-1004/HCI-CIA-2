import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { 
  Plus, Search, MoreHorizontal, CalendarIcon, Users, CheckCheck, 
  Clock, AlertTriangle, BarChart, ArrowRight, GridIcon, ListIcon, Folder
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { format, addDays, differenceInDays, isFuture, isPast } from "date-fns";

// Types
interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "on-hold" | "completed" | "cancelled";
  startDate: Date;
  endDate: Date;
  progress: number;
  teamMembers: User[];
  client?: Client;
  budget?: {
    total: number;
    spent: number;
    currency: string;
  };
  tasksTotal: number;
  tasksCompleted: number;
  tags?: string[];
  priority: "low" | "medium" | "high";
}

interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Client {
  id: string;
  name: string;
  company: string;
  avatar?: string;
  email: string;
}

// Sample data
const users: User[] = [
  { id: "1", name: "Sahana Priya S", role: "Project Manager", avatar: "" },
  { id: "2", name: "Thulasi Priya S", role: "Developer", avatar: "" },
  { id: "3", name: "Darshini P", role: "UI Designer", avatar: "" },
  { id: "4", name: "Shruthi M S", role: "Project Manager", avatar: "" },
  { id: "5", name: "Shruti T", role: "QA Tester", avatar: "" },
  { id: "6", name: "Darshini P", role: "Content Writer", avatar: "" },
];

const clients: Client[] = [
  { 
    id: "1", 
    name: "Sahana Priya S", 
    company: "Acme Inc", 
    avatar: "",
    email: "sahana@acmeinc.com" 
  },
  { 
    id: "2", 
    name: "Thulasi Priya S", 
    company: "XYZ Corporation", 
    avatar: "",
    email: "thulasi@xyzcorp.com" 
  },
  { 
    id: "3", 
    name: "Shruthi M S", 
    company: "Matrix Enterprises", 
    avatar: "",
    email: "shruthi@matrix.com" 
  },
];

// Sample projects
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with new branding",
    status: "in-progress",
    startDate: new Date(),
    endDate: addDays(new Date(), 45),
    progress: 32,
    teamMembers: [users[0], users[1], users[2], users[5]],
    client: clients[0],
    budget: {
      total: 25000,
      spent: 8200,
      currency: "USD"
    },
    tasksTotal: 24,
    tasksCompleted: 7,
    tags: ["design", "development", "marketing"],
    priority: "high"
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Creating a new mobile app for customer engagement",
    status: "planning",
    startDate: addDays(new Date(), 7),
    endDate: addDays(new Date(), 90),
    progress: 0,
    teamMembers: [users[0], users[2], users[4]],
    client: clients[1],
    budget: {
      total: 50000,
      spent: 0,
      currency: "USD"
    },
    tasksTotal: 35,
    tasksCompleted: 0,
    tags: ["mobile", "development", "ui/ux"],
    priority: "medium"
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q4 marketing campaign for product launch",
    status: "in-progress",
    startDate: addDays(new Date(), -15),
    endDate: addDays(new Date(), 30),
    progress: 65,
    teamMembers: [users[0], users[3], users[5]],
    client: clients[0],
    budget: {
      total: 15000,
      spent: 9800,
      currency: "USD"
    },
    tasksTotal: 18,
    tasksCompleted: 12,
    tags: ["marketing", "social-media", "content"],
    priority: "medium"
  },
  {
    id: "4",
    name: "Database Migration",
    description: "Migrating from legacy database to cloud solution",
    status: "completed",
    startDate: addDays(new Date(), -45),
    endDate: addDays(new Date(), -5),
    progress: 100,
    teamMembers: [users[0], users[2], users[4]],
    budget: {
      total: 20000,
      spent: 18500,
      currency: "USD"
    },
    tasksTotal: 15,
    tasksCompleted: 15,
    tags: ["database", "cloud", "migration"],
    priority: "high"
  },
  {
    id: "5",
    name: "Product Launch Event",
    description: "Planning and execution of new product launch event",
    status: "on-hold",
    startDate: addDays(new Date(), -10),
    endDate: addDays(new Date(), 25),
    progress: 40,
    teamMembers: [users[0], users[1], users[3], users[5]],
    client: clients[2],
    budget: {
      total: 35000,
      spent: 12000,
      currency: "USD"
    },
    tasksTotal: 28,
    tasksCompleted: 11,
    tags: ["event", "marketing", "pr"],
    priority: "high"
  },
];

export function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    status: "planning",
    progress: 0,
    tasksTotal: 0,
    tasksCompleted: 0,
    teamMembers: [],
    priority: "medium",
    startDate: new Date(),
    endDate: addDays(new Date(), 30)
  });
  
  // Filter projects based on status and search
  const filteredProjects = projects.filter(project => {
    // Filter by status
    if (filter !== "all" && project.status !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.client && project.client.name.toLowerCase().includes(query)) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });
  
  // Calculate completion percentages
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const activeProjects = projects.filter(p => p.status === "in-progress").length;
  const projectCompletionRate = Math.round((completedProjects / totalProjects) * 100);
  
  // Function to add a new project
  const addProject = () => {
    if (newProject.name && newProject.startDate && newProject.endDate) {
      const project: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name: newProject.name,
        description: newProject.description || "",
        status: newProject.status as any,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        progress: 0,
        teamMembers: newProject.teamMembers || [],
        client: newProject.client,
        budget: newProject.budget,
        tasksTotal: 0,
        tasksCompleted: 0,
        tags: newProject.tags,
        priority: newProject.priority as any
      };
      
      setProjects([...projects, project]);
      setNewProject({
        status: "planning",
        progress: 0,
        tasksTotal: 0,
        tasksCompleted: 0,
        teamMembers: [],
        priority: "medium",
        startDate: new Date(),
        endDate: addDays(new Date(), 30)
      });
      setShowAddProjectDialog(false);
    }
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "in-progress":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Get priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Calculate project timeline status
  const getProjectTimelineStatus = (project: Project) => {
    const totalDays = differenceInDays(project.endDate, project.startDate);
    const daysLeft = differenceInDays(project.endDate, new Date());
    
    if (project.status === "completed") {
      return { label: "Completed", color: "text-green-500" };
    }
    
    if (isPast(project.endDate)) {
      return { label: "Overdue", color: "text-red-500" };
    }
    
    if (daysLeft <= totalDays * 0.2) {
      return { label: `${daysLeft} days left`, color: "text-yellow-500" };
    }
    
    return { label: `${daysLeft} days left`, color: "text-blue-500" };
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and monitor all your projects in one place
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new project to track work and collaborate with your team
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    value={newProject.name || ""}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter project description"
                    value={newProject.description || ""}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select 
                      value={newProject.status || "planning"}
                      onValueChange={(value) => setNewProject({...newProject, status: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select 
                      value={newProject.priority || "medium"}
                      onValueChange={(value) => setNewProject({...newProject, priority: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date</Label>
                    <div className="flex items-center border rounded-md">
                      <CalendarIcon className="ml-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        className="flex-1 p-2 bg-transparent border-0 outline-none"
                        value={newProject.startDate ? format(newProject.startDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : undefined;
                          setNewProject({...newProject, startDate: date});
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <div className="flex items-center border rounded-md">
                      <CalendarIcon className="ml-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        className="flex-1 p-2 bg-transparent border-0 outline-none"
                        value={newProject.endDate ? format(newProject.endDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : undefined;
                          setNewProject({...newProject, endDate: date});
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Client</Label>
                  <Select 
                    onValueChange={(value) => {
                      const client = clients.find(c => c.id === value);
                      setNewProject({...newProject, client});
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={client.avatar} alt={client.name} />
                              <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                            </Avatar>
                            {client.name} ({client.company})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget</Label>
                  <div className="flex items-center">
                    <Select 
                      defaultValue="USD"
                      onValueChange={(currency) => {
                        setNewProject({
                          ...newProject, 
                          budget: { ...newProject.budget, currency } as any
                        });
                      }}
                    >
                      <SelectTrigger className="w-24 mr-2">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Budget amount"
                      className="flex-1"
                      onChange={(e) => {
                        const total = parseFloat(e.target.value);
                        setNewProject({
                          ...newProject, 
                          budget: { 
                            total, 
                            spent: 0, 
                            currency: newProject.budget?.currency || "USD" 
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags (e.g. design, development)"
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      setNewProject({...newProject, tags});
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddProjectDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={addProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="flex items-center border rounded-md overflow-hidden dark:border-gray-600">
            <div className="p-2 border-r dark:border-gray-600">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search projects..."
              className="border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex p-1 border rounded-md dark:border-gray-600">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Projects</div>
            <div className="text-3xl font-bold mt-1">{totalProjects}</div>
            <Progress value={projectCompletionRate} className="mt-3" />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {completedProjects} of {totalProjects} projects completed
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Projects</div>
            <div className="text-3xl font-bold mt-1">{activeProjects}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <Clock className="inline h-4 w-4 mr-1 text-blue-500" />
              {activeProjects} projects in progress
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed Projects</div>
            <div className="text-3xl font-bold mt-1">{completedProjects}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <CheckCheck className="inline h-4 w-4 mr-1 text-green-500" />
              {projectCompletionRate}% completion rate
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Budget</div>
            <div className="text-3xl font-bold mt-1">
              ${projects.reduce((sum, project) => sum + (project.budget?.total || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <BarChart className="inline h-4 w-4 mr-1 text-purple-500" />
              ${projects.reduce((sum, project) => sum + (project.budget?.spent || 0), 0).toLocaleString()} spent
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project List */}
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </div>
        
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-sm line-clamp-2 mt-1">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={cn("text-xs", getStatusBadge(project.status))}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={cn("text-xs", getPriorityBadge(project.priority))}>
                      {project.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <div>Progress</div>
                    <div>{project.progress}%</div>
                  </div>
                  <Progress value={project.progress} className="h-1 mb-3" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{format(project.startDate, 'MMM d')} - {format(project.endDate, 'MMM d, yyyy')}</span>
                    </div>
                    <div className={cn(
                      "text-xs font-medium",
                      getProjectTimelineStatus(project).color
                    )}>
                      {getProjectTimelineStatus(project).label}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <CheckCheck className="h-3 w-3" />
                      <span>{project.tasksCompleted}/{project.tasksTotal} tasks</span>
                    </div>
                    {project.budget && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Budget: {project.budget.currency} {project.budget.spent.toLocaleString()} / {project.budget.total.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.teamMembers.slice(0, 4).map(member => (
                        <Avatar key={member.id} className="h-7 w-7 border-2 border-white dark:border-gray-800">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.teamMembers.length > 4 && (
                        <div className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                          +{project.teamMembers.length - 4}
                        </div>
                      )}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-xs">
                      View <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div 
                    className="w-full md:w-1 h-1 md:h-auto" 
                    style={{ 
                      backgroundColor: 
                        project.status === "planning" ? "#3b82f6" :
                        project.status === "in-progress" ? "#10b981" :
                        project.status === "on-hold" ? "#f59e0b" :
                        project.status === "completed" ? "#6b7280" :
                        "#ef4444"
                    }}
                  ></div>
                  <div className="p-4 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium mb-1">{project.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Badge className={cn("text-xs", getStatusBadge(project.status))}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={cn("text-xs", getPriorityBadge(project.priority))}>
                          {project.priority}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Timeline</div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-gray-500" />
                          <span className="text-sm">{format(project.startDate, 'MMM d')} - {format(project.endDate, 'MMM d, yyyy')}</span>
                          <span className={cn(
                            "text-xs font-medium ml-1",
                            getProjectTimelineStatus(project).color
                          )}>
                            ({getProjectTimelineStatus(project).label})
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Progress</div>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Team</div>
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-2">
                            {project.teamMembers.slice(0, 3).map(member => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-white dark:border-gray-800">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {project.teamMembers.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                                +{project.teamMembers.length - 3}
                              </div>
                            )}
                          </div>
                          <span className="text-sm">{project.teamMembers.length} members</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tasks</div>
                        <div className="flex items-center gap-1">
                          <CheckCheck className="h-3 w-3 text-gray-500" />
                          <span className="text-sm">{project.tasksCompleted} of {project.tasksTotal} tasks completed</span>
                        </div>
                      </div>
                      
                      {project.budget && (
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Budget</div>
                          <div className="flex items-center gap-1">
                            <BarChart className="h-3 w-3 text-gray-500" />
                            <span className="text-sm">
                              {project.budget.currency} {project.budget.spent.toLocaleString()} / {project.budget.total.toLocaleString()} 
                              ({Math.round((project.budget.spent / project.budget.total) * 100)}%)
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {project.client && (
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Client</div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={project.client.avatar} alt={project.client.name} />
                              <AvatarFallback>{getInitials(project.client.name)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{project.client.name} ({project.client.company})</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg border">
            <div className="text-gray-500 dark:text-gray-400">
              <Folder className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p className="text-lg font-medium">No projects found</p>
              <p className="max-w-md mx-auto mt-1">
                {searchQuery 
                  ? "No projects match your search criteria. Try a different search term." 
                  : "There are no projects in this category. Add a new project to get started."}
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowAddProjectDialog(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Project
              </Button>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
}