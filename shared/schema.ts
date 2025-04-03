import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  avatar: text("avatar"),
  role: text("role"),
  status: text("status").default("offline"),
  lastActive: timestamp("last_active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  avatar: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Conversation model
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'private' or 'group'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  name: true,
  type: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

// Conversation participants
export const conversationParticipants = pgTable("conversation_participants", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  userId: integer("user_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const insertConversationParticipantSchema = createInsertSchema(conversationParticipants).pick({
  conversationId: true,
  userId: true,
});

export type InsertConversationParticipant = z.infer<typeof insertConversationParticipantSchema>;
export type ConversationParticipant = typeof conversationParticipants.$inferSelect;

// Message model
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  senderId: integer("sender_id").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  read: boolean("read").default(false),
  type: text("type").default("text"), // 'text', 'file', 'image'
  attachment: json("attachment"), // { name, type, size, url }
  mentions: json("mentions"), // array of usernames
  priority: text("priority").default("normal"), // 'normal', 'important', 'urgent'
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  conversationId: true,
  senderId: true,
  content: true,
  type: true,
  attachment: true,
  mentions: true,
  priority: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Dashboard statistics models
export const dashboardStats = pgTable("dashboard_stats", {
  id: serial("id").primaryKey(),
  activeProjects: integer("active_projects").notNull(),
  pendingTasks: integer("pending_tasks").notNull(),
  teamProductivity: integer("team_productivity").notNull(),
  upcomingMeetings: integer("upcoming_meetings").notNull(),
  nextMeeting: text("next_meeting"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pendingWorkData = pgTable("pending_work_data", {
  id: serial("id").primaryKey(),
  priority: text("priority").notNull(), // 'High', 'Medium', 'Low'
  tasks: integer("tasks").notNull(),
  color: text("color").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const performanceData = pgTable("performance_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  completion: integer("completion").notNull(),
  efficiency: integer("efficiency").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const completedWorkData = pgTable("completed_work_data", {
  id: serial("id").primaryKey(),
  period: text("period").notNull(), // 'Week 1', 'Week 2', etc.
  bugs: integer("bugs").notNull(),
  features: integer("features").notNull(),
  documents: integer("documents").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notificationsData = pgTable("notifications_data", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'Mentions', 'Meeting Reminders', etc.
  value: integer("value").notNull(),
  color: text("color").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectSuccessData = pgTable("project_success_data", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  success: integer("success").notNull(),
  failure: integer("failure").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workloadData = pgTable("workload_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  workload: integer("workload").notNull(), // Percentage
  status: text("status").notNull(), // 'Available', 'Good', 'Heavy', 'Overloaded'
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create insert schemas for dashboard data
export const insertDashboardStatsSchema = createInsertSchema(dashboardStats).pick({
  activeProjects: true,
  pendingTasks: true,
  teamProductivity: true,
  upcomingMeetings: true,
  nextMeeting: true,
});

export const insertPendingWorkDataSchema = createInsertSchema(pendingWorkData).pick({
  priority: true,
  tasks: true,
  color: true,
});

export const insertPerformanceDataSchema = createInsertSchema(performanceData).pick({
  month: true,
  completion: true,
  efficiency: true,
});

export const insertCompletedWorkDataSchema = createInsertSchema(completedWorkData).pick({
  period: true,
  bugs: true,
  features: true,
  documents: true,
});

export const insertNotificationsDataSchema = createInsertSchema(notificationsData).pick({
  type: true,
  value: true,
  color: true,
});

export const insertProjectSuccessDataSchema = createInsertSchema(projectSuccessData).pick({
  name: true,
  success: true,
  failure: true,
});

export const insertWorkloadDataSchema = createInsertSchema(workloadData).pick({
  userId: true,
  workload: true,
  status: true,
});

// Export types for dashboard data
export type InsertDashboardStats = z.infer<typeof insertDashboardStatsSchema>;
export type DashboardStats = typeof dashboardStats.$inferSelect;

export type InsertPendingWorkData = z.infer<typeof insertPendingWorkDataSchema>;
export type PendingWorkData = typeof pendingWorkData.$inferSelect;

export type InsertPerformanceData = z.infer<typeof insertPerformanceDataSchema>;
export type PerformanceData = typeof performanceData.$inferSelect;

export type InsertCompletedWorkData = z.infer<typeof insertCompletedWorkDataSchema>;
export type CompletedWorkData = typeof completedWorkData.$inferSelect;

export type InsertNotificationsData = z.infer<typeof insertNotificationsDataSchema>;
export type NotificationsData = typeof notificationsData.$inferSelect;

export type InsertProjectSuccessData = z.infer<typeof insertProjectSuccessDataSchema>;
export type ProjectSuccessData = typeof projectSuccessData.$inferSelect;

export type InsertWorkloadData = z.infer<typeof insertWorkloadDataSchema>;
export type WorkloadData = typeof workloadData.$inferSelect;
