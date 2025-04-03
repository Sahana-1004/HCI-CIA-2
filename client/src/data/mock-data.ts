import { ChatUser, ChatConversation, ChatMessage } from "@/context/chat-context";

// Mock Users
export const mockUsers: ChatUser[] = [
  {
    id: "current-user",
    name: "Sahana Priya S",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online"
  },
  {
    id: "user-1",
    name: "Thulasi Priya S",
    role: "Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "away",
    lastActive: "35 min ago"
  },
  {
    id: "user-2",
    name: "Darshini P",
    role: "UI Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online"
  },
  {
    id: "user-3",
    name: "Shruthi M S",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online"
  },
  {
    id: "user-4",
    name: "Shruti T",
    role: "QA Tester",
    avatar: "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "away",
    lastActive: "2 hours ago"
  },
  {
    id: "user-5",
    name: "Alex Wilson",
    role: "Designer",
    avatar: "",
    initials: "AW",
    status: "online"
  }
];

// Mock Chat Conversations
export const mockChatConversations: ChatConversation[] = [
  {
    id: "conv-1",
    type: "private",
    name: "Thulasi Priya S",
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      sender: "Thulasi Priya S",
      content: "Can you review my PR when you get a chance?",
      timestamp: new Date(Date.now() - 86400000), // yesterday
      read: false
    },
    unreadCount: 1,
    avatar: mockUsers[1].avatar
  },
  {
    id: "conv-2",
    type: "group",
    name: "Design Team",
    participants: [mockUsers[0], mockUsers[2], mockUsers[4], mockUsers[5]],
    lastMessage: {
      sender: "Alex Wilson",
      content: "I've uploaded the new mockups to Figma",
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      read: true
    },
    unreadCount: 0,
    initials: "DT"
  },
  {
    id: "conv-3",
    type: "private",
    name: "Darshini P",
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      sender: "Darshini P",
      content: "Thanks for your help with the design review!",
      timestamp: new Date(Date.now() - 2 * 86400000), // 2 days ago
      read: true
    },
    unreadCount: 0,
    avatar: mockUsers[2].avatar
  },
  {
    id: "conv-4",
    type: "group",
    name: "Marketing Team",
    participants: [mockUsers[0], mockUsers[3], mockUsers[4]],
    lastMessage: {
      sender: "Jessica",
      content: "Let's discuss the Q3 campaign next week",
      timestamp: new Date(Date.now() - 86400000), // yesterday
      read: true
    },
    unreadCount: 0,
    initials: "MT"
  },
  {
    id: "conv-5",
    type: "group",
    name: "Project Managers",
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      sender: "Sahana Priya S",
      content: "Please update your timesheets by EOD",
      timestamp: new Date(Date.now() - 3 * 86400000), // 3 days ago
      read: true
    },
    unreadCount: 0,
    initials: "PM"
  }
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  // Thulasi Priya S conversation
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Hey Sahana, can you review my PR when you get a chance? It's the fix for that UI bug we discussed yesterday.",
    timestamp: new Date(Date.now() - 86400000 - 3600000), // yesterday, 1 hour earlier
    read: true,
    type: "text"
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "current-user",
    content: "Sure, I'll take a look at it this afternoon. Is there anything specific you want me to focus on?",
    timestamp: new Date(Date.now() - 86400000 - 3400000), // yesterday, a bit later
    read: true,
    type: "text"
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Just check if the animation is smooth on mobile devices. I tested on my iPhone but would appreciate your input on Android.",
    timestamp: new Date(Date.now() - 86400000 - 3200000), // yesterday, a bit later
    read: true,
    type: "text"
  },
  {
    id: "msg-4",
    conversationId: "conv-1",
    senderId: "current-user",
    content: "I've checked the PR and tested on my Pixel. The animation works well, but there's a small layout issue when the keyboard appears. I left a comment on GitHub.",
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    read: true,
    type: "text"
  },
  {
    id: "msg-5",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Thanks @Sahana! I'll fix that issue today. By the way, are you joining the design review meeting at 2pm?",
    timestamp: new Date(Date.now() - 20400000), // 5.5 hours ago
    read: true,
    type: "text",
    mentions: ["Sahana"]
  },
  {
    id: "msg-6",
    conversationId: "conv-1",
    senderId: "current-user",
    content: "Yes, I'll be there. I have some feedback on the new dashboard layout we can discuss.",
    timestamp: new Date(Date.now() - 20200000), // 5.5 hours ago, a bit later
    read: true,
    type: "text"
  },
  {
    id: "msg-7",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Great! I've prepared some notes based on user feedback. Take a look:",
    timestamp: new Date(Date.now() - 18000000), // 5 hours ago
    read: true,
    type: "file",
    attachment: {
      name: "Dashboard_Feedback.pdf",
      type: "pdf",
      size: "2.4 MB",
      url: "#"
    }
  },
  
  // Design Team conversation
  {
    id: "msg-8",
    conversationId: "conv-2",
    senderId: "user-5",
    content: "Hi team, I've updated the design system with new components.",
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    read: true,
    type: "text"
  },
  {
    id: "msg-9",
    conversationId: "conv-2",
    senderId: "user-2",
    content: "Looks great! I've noticed the color scheme is more accessible now.",
    timestamp: new Date(Date.now() - 259000000), // 3 days ago, a bit later
    read: true,
    type: "text"
  },
  {
    id: "msg-10",
    conversationId: "conv-2",
    senderId: "current-user",
    content: "Can we discuss the dashboard layout in tomorrow's meeting?",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
    type: "text"
  },
  {
    id: "msg-11",
    conversationId: "conv-2",
    senderId: "user-2",
    content: "Yes, I'll prepare some mockups for that. @Alex, do you want to collaborate on this?",
    timestamp: new Date(Date.now() - 172600000), // 2 days ago, a bit later
    read: true,
    type: "text",
    mentions: ["Alex"]
  },
  {
    id: "msg-12",
    conversationId: "conv-2",
    senderId: "user-5",
    content: "I've uploaded the new mockups to Figma",
    timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
    read: true,
    type: "text"
  }
];

// Statistical data for charts
export const pendingWorkData = [
  { name: 'High Priority', tasks: 12, color: '#EF4444' }, // Red
  { name: 'Medium Priority', tasks: 19, color: '#F59E0B' }, // Amber
  { name: 'Low Priority', tasks: 8, color: '#10B981' }, // Green
];

export const performanceData = [
  { name: 'Jan', completion: 65, efficiency: 70 },
  { name: 'Feb', completion: 59, efficiency: 62 },
  { name: 'Mar', completion: 80, efficiency: 75 },
  { name: 'Apr', completion: 81, efficiency: 79 },
  { name: 'May', completion: 76, efficiency: 84 },
  { name: 'Jun', completion: 85, efficiency: 88 },
];

export const completedWorkData = [
  { 
    name: 'Week 1', 
    bugs: 12, 
    features: 8, 
    documents: 5 
  },
  { 
    name: 'Week 2', 
    bugs: 19, 
    features: 12, 
    documents: 8 
  },
  { 
    name: 'Week 3', 
    bugs: 16, 
    features: 10, 
    documents: 6 
  },
  { 
    name: 'Week 4', 
    bugs: 14, 
    features: 15, 
    documents: 9 
  },
];

export const notificationsData = [
  { name: 'Mentions', value: 28, color: '#3B82F6' }, // Blue
  { name: 'Meeting Reminders', value: 12, color: '#10B981' }, // Green
  { name: 'Deadlines', value: 7, color: '#EF4444' }, // Red
  { name: 'Project Updates', value: 35, color: '#8B5CF6' }, // Purple
];

export const projectSuccessData = [
  { 
    name: 'Alpha Project', 
    success: 75, 
    failure: 25 
  },
  { 
    name: 'Beta Initiative', 
    success: 62, 
    failure: 38 
  },
  { 
    name: 'Gamma Release', 
    success: 80, 
    failure: 20 
  },
  { 
    name: 'Delta Campaign', 
    success: 55, 
    failure: 45 
  },
];

export const workloadData = [
  {
    id: "1",
    name: "Darshini P",
    role: "UI Designer",
    avatar: "",
    workload: 65,
    status: "Good"
  },
  {
    id: "2",
    name: "Thulasi Priya S",
    role: "Developer",
    avatar: "",
    workload: 90,
    status: "Overloaded"
  },
  {
    id: "3",
    name: "Shruthi M S",
    role: "Project Manager",
    avatar: "",
    workload: 78,
    status: "Heavy"
  },
  {
    id: "4",
    name: "Shruti T",
    role: "QA Tester",
    avatar: "",
    workload: 45,
    status: "Available"
  }
];

export const statsCards = [
  {
    title: "Active Projects",
    value: "12",
    change: "+4%",
    changeType: "positive",
    icon: "project",
    iconColor: "blue",
    timespan: "from last week"
  },
  {
    title: "Pending Tasks",
    value: "28",
    change: "+12%",
    changeType: "negative",
    icon: "tasks",
    iconColor: "red",
    timespan: "from last week"
  },
  {
    title: "Team Productivity",
    value: "84%",
    change: "+7%",
    changeType: "positive",
    icon: "chart",
    iconColor: "green",
    timespan: "from last week"
  },
  {
    title: "Upcoming Meetings",
    value: "5",
    nextMeeting: "2:00 PM",
    icon: "calendar",
    iconColor: "purple"
  }
];
