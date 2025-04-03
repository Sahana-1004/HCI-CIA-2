import { useState } from "react";
import { Download, MoreVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatsCard } from "./stats-card";
import { PendingWorkChart } from "./pending-work-chart";
import { PerformanceChart } from "./performance-chart";
import { CompletedWorkChart } from "./completed-work-chart";
import { NotificationsChart } from "./notifications-chart";
import { WorkloadDistribution } from "./workload-distribution";
import { ProjectSuccessChart } from "./project-success-chart";

const statsCards = [
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

export function Dashboard() {
  const [timeFrame, setTimeFrame] = useState("7");
  
  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Performance Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor team productivity and project status</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last quarter</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            changeType={card.changeType}
            icon={card.icon}
            iconColor={card.iconColor}
            timespan={card.timespan}
            nextMeeting={card.nextMeeting}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pending Work Tracker */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Pending Work Tracker</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="h-64">
            <PendingWorkChart />
          </div>
        </div>

        {/* Performance Improvement Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Performance Improvement Analysis</h3>
            <div className="flex space-x-2">
              <Select defaultValue="30">
                <SelectTrigger className="h-8 text-xs w-[110px]">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last quarter</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-64">
            <PerformanceChart />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Completed Work Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Completed Work Overview</h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span>Bugs Fixed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span>Features</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                <span>Docs</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <CompletedWorkChart />
          </div>
        </div>

        {/* Notifications Dashboard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Notifications Dashboard</h3>
            <Button variant="outline" size="sm" className="text-xs">
              Mark all as read
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-48 h-48">
              <NotificationsChart />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-xs text-gray-500 dark:text-gray-400">Mentions</p>
              <p className="font-bold text-blue-600 dark:text-blue-400">28</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-xs text-gray-500 dark:text-gray-400">Meetings</p>
              <p className="font-bold text-green-600 dark:text-green-400">12</p>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
              <p className="text-xs text-gray-500 dark:text-gray-400">Deadlines</p>
              <p className="font-bold text-red-600 dark:text-red-400">7</p>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="text-xs text-gray-500 dark:text-gray-400">Updates</p>
              <p className="font-bold text-purple-600 dark:text-purple-400">35</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload Distribution Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Workload Distribution</h3>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 text-xs w-[110px]">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <WorkloadDistribution />
          </div>
        </div>

        {/* Project Success and Failure Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Project Success/Failure Analytics</h3>
            <div className="flex text-xs space-x-2">
              <Button variant="secondary" size="sm" className="px-2 py-1 h-auto text-xs">
                2023
              </Button>
              <Button variant="ghost" size="sm" className="px-2 py-1 h-auto text-xs">
                2022
              </Button>
            </div>
          </div>
          <div className="h-64">
            <ProjectSuccessChart />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Success Rate</h4>
              <p className="text-lg font-bold">68%</p>
              <p className="text-xs text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                5% from last year
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">On-Budget Completion</h4>
              <p className="text-lg font-bold">73%</p>
              <p className="text-xs text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8% from last year
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
