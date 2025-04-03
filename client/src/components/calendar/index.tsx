import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, getInitials } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, Calendar as CalendarIcon, Clock, MapPin, Users, X, Check, Tag } from "lucide-react";
import { addDays, format, isSameDay, isSameMonth, isToday, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, parseISO, set, isBefore, addHours } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  endTime?: string;
  description?: string;
  location?: string;
  type: "meeting" | "task" | "reminder" | "deadline";
  attendees?: Array<{ id: string; name: string }>;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

// Sample data for users and events
const users: User[] = [
  { id: "1", name: "Sahana Priya S", role: "Project Manager", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "2", name: "Thulasi Priya S", role: "Developer", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: "3", name: "Darshini P", role: "UI Designer", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: "4", name: "Shruthi M S", role: "Project Manager", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: "5", name: "Shruti T", role: "QA Tester", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
  { id: "6", name: "Team Member", role: "Content Writer", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
];

const today = new Date();
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Status Meeting",
    date: today,
    time: "09:00",
    endTime: "10:00",
    description: "Weekly team status update and planning session",
    location: "Conference Room A",
    type: "meeting",
    attendees: [
      { id: "1", name: "Sahana Priya S" },
      { id: "2", name: "Thulasi Priya S" },
      { id: "3", name: "Darshini P" },
      { id: "4", name: "Shruthi M S" },
    ]
  },
  {
    id: "2",
    title: "Project Deadline",
    date: addDays(today, 3),
    time: "18:00",
    description: "Final submission deadline for the website redesign project",
    type: "deadline"
  },
  {
    id: "3",
    title: "Client Meeting",
    date: addDays(today, 1),
    time: "14:00",
    endTime: "15:30",
    description: "Discuss project requirements with the client",
    location: "Virtual (Zoom)",
    type: "meeting",
    attendees: [
      { id: "1", name: "Sahana Priya S" },
      { id: "4", name: "Shruthi M S" },
    ]
  },
  {
    id: "4",
    title: "Submit Progress Report",
    date: addDays(today, 2),
    time: "12:00",
    description: "Send weekly progress report to the management team",
    type: "task"
  },
  {
    id: "5",
    title: "Design Review",
    date: addDays(today, -1),
    time: "11:00",
    endTime: "12:00",
    location: "Design Lab",
    description: "Review new design mockups with the team",
    type: "meeting",
    attendees: [
      { id: "1", name: "Sahana Priya S" },
      { id: "2", name: "Thulasi Priya S" },
      { id: "5", name: "Shruti T" },
    ]
  },
  {
    id: "6",
    title: "Follow up with Marketing",
    date: addDays(today, 5),
    time: "15:00",
    description: "Discuss marketing strategy for the upcoming product launch",
    type: "reminder"
  },
  {
    id: "7",
    title: "Product Demo",
    date: addDays(today, 4),
    time: "13:00",
    endTime: "14:00",
    location: "Demo Room",
    description: "Present the new features to the stakeholders",
    type: "meeting",
    attendees: [
      { id: "1", name: "Sahana Priya S" },
      { id: "3", name: "Darshini P" },
      { id: "5", name: "Shruti T" },
    ]
  },
  {
    id: "8",
    title: "Review Analytics",
    date: addDays(today, 6),
    time: "10:00",
    description: "Analyze the monthly website traffic and user engagement data",
    type: "task"
  },
  {
    id: "9",
    title: "Team Building Event",
    date: addDays(today, 8),
    time: "16:00",
    endTime: "18:00",
    location: "City Park",
    description: "Team building activities and social gathering",
    type: "meeting",
    attendees: users.map(user => ({ id: user.id, name: user.name }))
  },
  {
    id: "10",
    title: "Budget Planning",
    date: addDays(today, 7),
    time: "09:30",
    endTime: "11:00",
    location: "Finance Room",
    description: "Plan the budget for the next quarter",
    type: "meeting",
    attendees: [
      { id: "1", name: "Sahana Priya S" },
    ]
  },
];

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [isViewEventDialogOpen, setIsViewEventDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    date: new Date(),
    type: "meeting"
  });
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Function to add a new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const eventToAdd: CalendarEvent = {
        id: `event-${Date.now()}`,
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        endTime: newEvent.endTime,
        description: newEvent.description,
        location: newEvent.location,
        type: newEvent.type as "meeting" | "task" | "reminder" | "deadline",
        attendees: selectedAttendees.length > 0 
          ? selectedAttendees.map(id => {
              const user = users.find(user => user.id === id);
              return { id, name: user?.name || "" };
            }) 
          : undefined
      };
      
      setEvents([...events, eventToAdd]);
      setNewEvent({
        date: new Date(),
        type: "meeting"
      });
      setSelectedAttendees([]);
      setIsAddEventDialogOpen(false);
    }
  };
  
  // Function to delete an event
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setIsViewEventDialogOpen(false);
  };
  
  // Check if a date has events
  const hasEventOnDate = (date: Date) => {
    return events.some(event => isSameDay(event.date, date));
  };
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events
      .filter(event => isSameDay(event.date, date))
      .sort((a, b) => {
        // Sort by time if available
        if (a.time && b.time) {
          return a.time.localeCompare(b.time);
        }
        // Put events with time before events without time
        if (a.time && !b.time) return -1;
        if (!a.time && b.time) return 1;
        return 0;
      });
  };
  
  // Get color based on event type
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return {
          bg: "bg-blue-100 dark:bg-blue-900",
          text: "text-blue-800 dark:text-blue-300",
          dot: "bg-blue-500"
        };
      case "task":
        return {
          bg: "bg-green-100 dark:bg-green-900",
          text: "text-green-800 dark:text-green-300",
          dot: "bg-green-500"
        };
      case "reminder":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900",
          text: "text-yellow-800 dark:text-yellow-300",
          dot: "bg-yellow-500"
        };
      case "deadline":
        return {
          bg: "bg-red-100 dark:bg-red-900",
          text: "text-red-800 dark:text-red-300",
          dot: "bg-red-500"
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "text-gray-800 dark:text-gray-300",
          dot: "bg-gray-500"
        };
    }
  };
  
  // Format time for display
  const formatDisplayTime = (time?: string, endTime?: string) => {
    if (!time) return "";
    
    // Convert 24h to 12h format
    const formatTimeString = (timeStr: string) => {
      const [hour, minute] = timeStr.split(':').map(Number);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
    };
    
    if (endTime) {
      return `${formatTimeString(time)} - ${formatTimeString(endTime)}`;
    }
    
    return formatTimeString(time);
  };
  
  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Calculate how many days from the previous month we need to include
    const startDay = getDay(monthStart);
    
    // Add days from the previous month to fill the first row
    let prevMonthDays: Date[] = [];
    if (startDay > 0) {
      const prevMonth = subMonths(monthStart, 1);
      const prevMonthEnd = endOfMonth(prevMonth);
      const daysToAdd = startDay;
      
      prevMonthDays = Array.from({ length: daysToAdd }, (_, i) => 
        addDays(prevMonthEnd, -(daysToAdd - 1) + i)
      );
    }
    
    // Add days from the next month to complete the grid (6 rows x 7 columns)
    const totalDaysNeeded = 42; // 6 weeks
    const remainingDays = totalDaysNeeded - (prevMonthDays.length + calendarDays.length);
    const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => 
      addDays(monthEnd, i + 1)
    );
    
    return [...prevMonthDays, ...calendarDays, ...nextMonthDays];
  };
  
  const calendarDays = generateCalendarDays();
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your schedule and appointments
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={goToToday}
            variant="outline"
            className="hidden md:flex"
          >
            Today
          </Button>
          
          <Button
            onClick={goToPreviousMonth}
            variant="outline"
            size="icon"
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={goToNextMonth}
            variant="outline"
            size="icon"
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="text-lg font-medium ml-2 hidden md:block">
            {format(currentMonth, 'MMMM yyyy')}
          </div>
          
          <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
            <DialogTrigger asChild>
              <Button className="ml-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event in your calendar
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title || ""}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Event Type</Label>
                    <Select 
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({...newEvent, type: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newEvent.date ? format(newEvent.date, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newEvent.date}
                          onSelect={(date) => date && setNewEvent({...newEvent, date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.time || ""}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime || ""}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location (optional)"
                    value={newEvent.location || ""}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description (optional)"
                    rows={3}
                    value={newEvent.description || ""}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Attendees</Label>
                  <Select
                    onValueChange={(value) => {
                      if (!selectedAttendees.includes(value)) {
                        setSelectedAttendees([...selectedAttendees, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add attendees" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            {user.name} {user.role ? `(${user.role})` : ''}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedAttendees.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedAttendees.map(id => {
                        const user = users.find(user => user.id === id);
                        if (!user) return null;
                        
                        return (
                          <Badge variant="secondary" key={id} className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="text-[8px]">{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => setSelectedAttendees(selectedAttendees.filter(a => a !== id))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="text-lg font-medium mb-4 md:hidden">
        {format(currentMonth, 'MMMM yyyy')}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="grid grid-cols-7 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={i} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 flex-1 auto-rows-fr mb-4">
            {calendarDays.map((day, i) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);
              const hasEvents = hasEventOnDate(day);
              
              return (
                <div 
                  key={i}
                  className={cn(
                    "min-h-[80px] p-1 border rounded-md relative transition-colors",
                    isSelected ? "border-primary" : "border-transparent hover:border-gray-300 dark:hover:border-gray-600",
                    !isCurrentMonth && "opacity-40"
                  )}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={cn(
                    "flex justify-center items-center rounded-full w-7 h-7 mb-1 mx-auto text-sm",
                    isCurrentDay && !isSelected && "bg-gray-100 dark:bg-gray-800 font-bold",
                    isSelected && "bg-primary text-primary-foreground font-bold"
                  )}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="overflow-hidden">
                    {hasEvents && (
                      <div className="space-y-1">
                        {getEventsForDate(day).slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={cn(
                              "text-xs truncate px-1 py-0.5 rounded-sm",
                              getEventTypeColor(event.type).bg,
                              getEventTypeColor(event.type).text
                            )}
                          >
                            {event.time && 
                              <span className="font-medium mr-1">{event.time.substring(0, 5)}</span>
                            }
                            {event.title}
                          </div>
                        ))}
                        
                        {getEventsForDate(day).length > 2 && (
                          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                            +{getEventsForDate(day).length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected Day Events */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <div>{format(selectedDate, 'EEEE, MMMM d')}</div>
                {isToday(selectedDate) && (
                  <Badge variant="outline" className="ml-2">Today</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length === 0 
                  ? "No events scheduled" 
                  : `${selectedDateEvents.length} event${selectedDateEvents.length !== 1 ? 's' : ''} scheduled`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isViewEventDialogOpen} onOpenChange={setIsViewEventDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  {selectedEvent && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{selectedEvent.title}</DialogTitle>
                        <DialogDescription>
                          <Badge className={cn(
                            "mt-2",
                            getEventTypeColor(selectedEvent.type).bg,
                            getEventTypeColor(selectedEvent.type).text
                          )}>
                            {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                          </Badge>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-gray-500" />
                          <span>{format(selectedEvent.date, 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        
                        {selectedEvent.time && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{formatDisplayTime(selectedEvent.time, selectedEvent.endTime)}</span>
                          </div>
                        )}
                        
                        {selectedEvent.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{selectedEvent.location}</span>
                          </div>
                        )}
                        
                        {selectedEvent.description && (
                          <div className="pt-2 border-t">
                            <h4 className="text-sm font-medium mb-1">Description</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {selectedEvent.description}
                            </p>
                          </div>
                        )}
                        
                        {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                          <div className="pt-2 border-t">
                            <div className="flex items-start gap-2">
                              <Users className="h-4 w-4 text-gray-500 mt-1" />
                              <div>
                                <h4 className="text-sm font-medium mb-1">Attendees ({selectedEvent.attendees.length})</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedEvent.attendees.map(attendee => {
                                    const user = users.find(u => u.id === attendee.id);
                                    return (
                                      <Badge variant="secondary" key={attendee.id} className="flex items-center gap-1">
                                        <Avatar className="h-4 w-4">
                                          <AvatarImage src={user?.avatar} alt={attendee.name} />
                                          <AvatarFallback className="text-[8px]">{getInitials(attendee.name)}</AvatarFallback>
                                        </Avatar>
                                        {attendee.name}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteEvent(selectedEvent.id)}
                        >
                          Delete Event
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              
              {selectedDateEvents.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <CalendarIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No events for this day</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-xs">
                    There are no events scheduled for {format(selectedDate, 'MMMM d, yyyy')}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewEvent({ ...newEvent, date: selectedDate });
                      setIsAddEventDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => {
                    const typeColor = getEventTypeColor(event.type);
                    
                    return (
                      <div 
                        key={event.id}
                        className="flex p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsViewEventDialogOpen(true);
                        }}
                      >
                        <div className={cn("w-1.5 rounded-full mr-3 self-stretch", typeColor.dot)} />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{event.title}</h3>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {event.time && (
                              <>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{formatDisplayTime(event.time, event.endTime)}</span>
                                <span className="mx-2">•</span>
                              </>
                            )}
                            <Badge className={cn("text-xs", typeColor.bg, typeColor.text)}>
                              {event.type}
                            </Badge>
                          </div>
                          
                          {(event.location || (event.attendees && event.attendees.length > 0)) && (
                            <div className="flex flex-wrap items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                              {event.location && (
                                <div className="flex items-center mr-3">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              
                              {event.attendees && event.attendees.length > 0 && (
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setNewEvent({ ...newEvent, date: selectedDate });
                      setIsAddEventDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}