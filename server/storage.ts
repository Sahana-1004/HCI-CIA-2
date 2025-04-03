import { 
  users, type User, type InsertUser,
  conversations, type Conversation, type InsertConversation,
  messages, type Message, type InsertMessage,
  dashboardStats, type DashboardStats, type InsertDashboardStats,
  pendingWorkData, type PendingWorkData, type InsertPendingWorkData,
  performanceData, type PerformanceData, type InsertPerformanceData,
  completedWorkData, type CompletedWorkData, type InsertCompletedWorkData,
  notificationsData, type NotificationsData, type InsertNotificationsData,
  projectSuccessData, type ProjectSuccessData, type InsertProjectSuccessData,
  workloadData, type WorkloadData, type InsertWorkloadData
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Conversation methods
  getAllConversations(): Promise<Conversation[]>;
  getConversationById(id: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  
  // Message methods
  getMessagesByConversationId(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Dashboard methods
  getDashboardStats(): Promise<DashboardStats[]>;
  getPendingWorkData(): Promise<PendingWorkData[]>;
  getPerformanceData(): Promise<PerformanceData[]>;
  getCompletedWorkData(): Promise<CompletedWorkData[]>;
  getNotificationsData(): Promise<NotificationsData[]>;
  getProjectSuccessData(): Promise<ProjectSuccessData[]>;
  getWorkloadData(): Promise<WorkloadData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private conversations: Map<string, Conversation>;
  private messages: Map<string, Message>;
  private dashboardStatsData: DashboardStats[];
  private pendingWorkItems: PendingWorkData[];
  private performanceItems: PerformanceData[];
  private completedWorkItems: CompletedWorkData[];
  private notificationItems: NotificationsData[];
  private projectSuccessItems: ProjectSuccessData[];
  private workloadItems: WorkloadData[];
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    this.dashboardStatsData = [];
    this.pendingWorkItems = [];
    this.performanceItems = [];
    this.completedWorkItems = [];
    this.notificationItems = [];
    this.projectSuccessItems = [];
    this.workloadItems = [];
    this.currentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      status: null,
      avatar: insertUser.avatar || null,
      role: insertUser.role || null,
      lastActive: null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  // Conversation methods
  async getAllConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values());
  }
  
  async getConversationById(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }
  
  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const id = this.currentId++;
    const newConversation: Conversation = { 
      ...conversation, 
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.conversations.set(id.toString(), newConversation);
    return newConversation;
  }
  
  // Message methods
  async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    const conversationIdNum = parseInt(conversationId);
    return Array.from(this.messages.values()).filter(
      (message) => message.conversationId === conversationIdNum
    );
  }
  
  async createMessage(messageInput: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    
    // Create a proper Message object with all required fields
    const message: Message = {
      id,
      conversationId: messageInput.conversationId,
      senderId: messageInput.senderId,
      content: messageInput.content,
      timestamp: new Date(),
      read: false,
      type: messageInput.type || "text",
      attachment: messageInput.attachment || null,
      mentions: messageInput.mentions || null,
      priority: messageInput.priority || "normal"
    };
    
    this.messages.set(id.toString(), message);
    return message;
  }
  
  // Dashboard methods
  async getDashboardStats(): Promise<DashboardStats[]> {
    return this.dashboardStatsData;
  }
  
  async getPendingWorkData(): Promise<PendingWorkData[]> {
    return this.pendingWorkItems;
  }
  
  async getPerformanceData(): Promise<PerformanceData[]> {
    return this.performanceItems;
  }
  
  async getCompletedWorkData(): Promise<CompletedWorkData[]> {
    return this.completedWorkItems;
  }
  
  async getNotificationsData(): Promise<NotificationsData[]> {
    return this.notificationItems;
  }
  
  async getProjectSuccessData(): Promise<ProjectSuccessData[]> {
    return this.projectSuccessItems;
  }
  
  async getWorkloadData(): Promise<WorkloadData[]> {
    return this.workloadItems;
  }
}

export const storage = new MemStorage();
