import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Plus, CalendarIcon, CheckCheck, Clock, ArrowUpRight, Trash2, Edit, Filter, Users, SortAsc, Search } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { format, isToday, isThisWeek, isPast, addDays } from "date-fns";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: Date;
  assignedTo?: User;
  project?: Project;
  createdAt: Date;
  completedAt?: Date;
  subtasks?: Subtask[];
  tags?: string[];
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

// Sample data
const users: User[] = [
  { id: "1", name: "Sahana Priya S", avatar: "", role: "Project Manager" },
  { id: "2", name: "Thulasi Priya S", avatar: "", role: "Developer" },
  { id: "3", name: "Darshini P", avatar: "", role: "UI Designer" },
  { id: "4", name: "Shruthi M S", avatar: "", role: "Project Manager" },
  { id: "5", name: "Shruti T", avatar: "", role: "QA Tester" },
];

const projects: Project[] = [
  { id: "1", name: "Website Redesign", color: "#4f46e5" },
  { id: "2", name: "Mobile App Development", color: "#0ea5e9" },
  { id: "3", name: "Marketing Campaign", color: "#10b981" },
  { id: "4", name: "Product Launch", color: "#f59e0b" },
];

const initialTasks: Task[] = [
  {
    id: "task1",
    title: "Design new homepage layout",
    description: "Create wireframes and mockups for the new homepage design",
    status: "in-progress",
    priority: "high",
    dueDate: addDays(new Date(), 2),
    assignedTo: users[1],
    project: projects[0],
    createdAt: new Date(),
    subtasks: [
      { id: "sub1", title: "Research competitor websites", completed: true },
      { id: "sub2", title: "Create wireframes", completed: true },
      { id: "sub3", title: "Design high-fidelity mockups", completed: false },
    ],
    tags: ["design", "ui/ux", "website"]
  },
  {
    id: "task2",
    title: "Fix login authentication bug",
    description: "Users are unable to log in with correct credentials",
    status: "todo",
    priority: "urgent",
    dueDate: new Date(),
    assignedTo: users[2],
    project: projects[0],
    createdAt: new Date(),
    tags: ["bug", "authentication", "critical"]
  },
  {
    id: "task3",
    title: "Create content for product pages",
    description: "Write compelling product descriptions for the new product line",
    status: "review",
    priority: "medium",
    dueDate: addDays(new Date(), 5),
    assignedTo: users[3],
    project: projects[2],
    createdAt: new Date(),
    tags: ["content", "copywriting", "marketing"]
  },
  {
    id: "task4",
    title: "Implement analytics tracking",
    description: "Set up Google Analytics and events tracking across the website",
    status: "todo",
    priority: "medium",
    dueDate: addDays(new Date(), 7),
    assignedTo: users[2],
    project: projects[0],
    createdAt: new Date(),
    tags: ["analytics", "development"]
  },
  {
    id: "task5",
    title: "Finalize app icon design",
    status: "done",
    priority: "low",
    dueDate: addDays(new Date(), -2),
    assignedTo: users[1],
    project: projects[1],
    createdAt: new Date(),
    completedAt: new Date(),
    tags: ["design", "mobile app"]
  },
];

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    status: "todo",
    priority: "medium",
    createdAt: new Date()
  });
  
  // Function to filter tasks based on status and search query
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter !== "all" && task.status !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)) ||
        (task.assignedTo && task.assignedTo.name.toLowerCase().includes(query)) ||
        (task.project && task.project.name.toLowerCase().includes(query)) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });
  
  // Calculate task counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "done").length;
  const dueTodayTasks = tasks.filter(task => task.dueDate && isToday(task.dueDate)).length;
  const overdueVsks = tasks.filter(task => task.dueDate && isPast(task.dueDate) && task.status !== "done").length;
  
  // Function to add a new task
  const addTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTask.title,
        description: newTask.description,
        status: newTask.status as "todo" | "in-progress" | "review" | "done",
        priority: newTask.priority as "low" | "medium" | "high" | "urgent",
        dueDate: newTask.dueDate,
        assignedTo: newTask.assignedTo,
        project: newTask.project,
        createdAt: new Date(),
        tags: newTask.tags,
        subtasks: newTask.subtasks || []
      };
      
      setTasks([...tasks, task]);
      setNewTask({
        status: "todo",
        priority: "medium",
        createdAt: new Date()
      });
      setShowAddTaskDialog(false);
    }
  };
  
  // Function to toggle a task status
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === "done" ? "todo" : "done";
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === "done" ? new Date() : undefined
        };
      }
      return task;
    }));
  };
  
  // Function to toggle a subtask
  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.subtasks) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask => {
            if (subtask.id === subtaskId) {
              return {
                ...subtask,
                completed: !subtask.completed
              };
            }
            return subtask;
          })
        };
      }
      return task;
    }));
  };
  
  // Function to delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  // Function to add a subtask
  const addSubtask = (taskId: string, subtaskTitle: string) => {
    if (!subtaskTitle.trim()) return;
    
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newSubtask = {
          id: Math.random().toString(36).substr(2, 9),
          title: subtaskTitle,
          completed: false
        };
        
        return {
          ...task,
          subtasks: [...(task.subtasks || []), newSubtask]
        };
      }
      return task;
    }));
  };
  
  // Function to get priority badge variant
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "high":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Calculate completion percentage for a task with subtasks
  const getTaskCompletion = (task: Task) => {
    if (!task.subtasks || task.subtasks.length === 0) {
      return task.status === "done" ? 100 : 0;
    }
    
    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and organize your tasks and projects
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task to keep track of your work
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Task title"
                    value={newTask.title || ""}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Task description"
                    value={newTask.description || ""}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select 
                      value={newTask.priority || "medium"}
                      onValueChange={(value) => setNewTask({...newTask, priority: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select 
                      value={newTask.status || "todo"}
                      onValueChange={(value) => setNewTask({...newTask, status: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Due Date</Label>
                    <div className="flex items-center border rounded-md">
                      <CalendarIcon className="ml-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        className="flex-1 p-2 bg-transparent border-0 outline-none"
                        value={newTask.dueDate ? format(newTask.dueDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : undefined;
                          setNewTask({...newTask, dueDate: date});
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Project</Label>
                    <Select 
                      onValueChange={(value) => {
                        const project = projects.find(p => p.id === value);
                        setNewTask({...newTask, project});
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: project.color }}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Assign To</Label>
                  <Select 
                    onValueChange={(value) => {
                      const user = users.find(u => u.id === value);
                      setNewTask({...newTask, assignedTo: user});
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags (e.g. design, development)"
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      setNewTask({...newTask, tags});
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={addTask}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="flex items-center border rounded-md overflow-hidden dark:border-gray-600">
            <div className="p-2 border-r dark:border-gray-600">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search tasks..."
              className="border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
            <div className="text-3xl font-bold mt-1">{totalTasks}</div>
            <Progress value={(completedTasks / totalTasks) * 100} className="mt-3" />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {completedTasks} of {totalTasks} tasks completed
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
            <div className="text-3xl font-bold mt-1">{completedTasks}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <CheckCheck className="inline h-4 w-4 mr-1 text-green-500" />
              {Math.round((completedTasks / totalTasks) * 100)}% completion rate
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Due Today</div>
            <div className="text-3xl font-bold mt-1">{dueTodayTasks}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <Clock className="inline h-4 w-4 mr-1 text-blue-500" />
              {dueTodayTasks} tasks need attention today
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">Overdue</div>
            <div className="text-3xl font-bold mt-1 text-red-500">{overdueVsks}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <ArrowUpRight className="inline h-4 w-4 mr-1 text-red-500" />
              {overdueVsks} tasks past their due date
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Task List */}
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Card key={task.id} className="overflow-hidden">
                <div className="flex">
                  <div 
                    className="w-1" 
                    style={{ 
                      backgroundColor: task.project?.color || '#CBD5E1',
                    }}
                  ></div>
                  <CardContent className="p-4 w-full">
                    <div className="flex items-start">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.status === "done"}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <Label 
                            htmlFor={`task-${task.id}`}
                            className={cn(
                              "font-medium cursor-pointer text-base",
                              task.status === "done" && "line-through text-gray-500 dark:text-gray-400"
                            )}
                          >
                            {task.title}
                          </Label>
                          
                          <div className="flex items-center gap-2">
                            {task.priority && (
                              <Badge className={cn("text-xs", getPriorityBadge(task.priority))}>
                                {task.priority}
                              </Badge>
                            )}
                            
                            {task.dueDate && (
                              <Badge variant="outline" className={cn(
                                "text-xs",
                                isToday(task.dueDate) && "text-yellow-600 border-yellow-300 bg-yellow-50",
                                isPast(task.dueDate) && task.status !== "done" && "text-red-600 border-red-300 bg-red-50"
                              )}>
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {format(task.dueDate, 'MMM d, yyyy')}
                              </Badge>
                            )}
                            
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {task.description}
                          </p>
                        )}
                        
                        {task.subtasks && task.subtasks.length > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <div>Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})</div>
                              <div>{getTaskCompletion(task)}%</div>
                            </div>
                            <Progress value={getTaskCompletion(task)} className="h-1" />
                            
                            <div className="mt-2 space-y-1">
                              {task.subtasks.map(subtask => (
                                <div key={subtask.id} className="flex items-center">
                                  <Checkbox 
                                    id={`subtask-${subtask.id}`}
                                    checked={subtask.completed}
                                    onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                                  />
                                  <Label 
                                    htmlFor={`subtask-${subtask.id}`}
                                    className={cn(
                                      "ml-2 text-sm cursor-pointer",
                                      subtask.completed && "line-through text-gray-500 dark:text-gray-400"
                                    )}
                                  >
                                    {subtask.title}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            {task.assignedTo && (
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                                  <AvatarFallback>{getInitials(task.assignedTo.name)}</AvatarFallback>
                                </Avatar>
                                {task.assignedTo.name}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {task.project && (
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <div 
                                  className="w-3 h-3 rounded-full mr-1" 
                                  style={{ backgroundColor: task.project.color }}
                                ></div>
                                {task.project.name}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => deleteTask(task.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <div className="text-gray-500 dark:text-gray-400">
                <CheckCheck className="h-10 w-10 mx-auto mb-3 opacity-20" />
                <p className="text-lg font-medium">No tasks found</p>
                <p className="max-w-md mx-auto mt-1">
                  {searchQuery 
                    ? "No tasks match your search criteria. Try a different search term." 
                    : "There are no tasks in this category. Add a new task to get started."}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowAddTaskDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Task
                </Button>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}