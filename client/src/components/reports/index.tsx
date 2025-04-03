import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, LineChart, PieChart, Activity, Download, Share2, 
  Printer, Calendar, ChevronDown, Info, TrendingUp, TrendingDown
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, 
         Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, 
         Pie, Cell, AreaChart, Area, ComposedChart, Scatter } from "recharts";
import { format, subMonths, subDays } from "date-fns";

// Data for charts
const monthlyData = [
  { name: "Jan", completed: 45, total: 60, performance: 75 },
  { name: "Feb", completed: 52, total: 70, performance: 74 },
  { name: "Mar", completed: 48, total: 65, performance: 73 },
  { name: "Apr", completed: 61, total: 75, performance: 81 },
  { name: "May", completed: 55, total: 70, performance: 78 },
  { name: "Jun", completed: 67, total: 80, performance: 83 },
  { name: "Jul", completed: 72, total: 85, performance: 85 },
  { name: "Aug", completed: 69, total: 75, performance: 92 },
  { name: "Sep", completed: 74, total: 82, performance: 90 },
  { name: "Oct", completed: 78, total: 90, performance: 87 },
  { name: "Nov", completed: 81, total: 88, performance: 92 },
  { name: "Dec", completed: 76, total: 85, performance: 89 },
];

const teamPerformanceData = [
  { name: "Sahana Priya S", value: 87, color: "#3b82f6" },
  { name: "Thulasi Priya S", value: 92, color: "#10b981" },
  { name: "Darshini P", value: 76, color: "#f59e0b" },
  { name: "Shruthi M S", value: 83, color: "#8b5cf6" },
  { name: "Shruti T", value: 79, color: "#ef4444" },
];

const projectStatusData = [
  { name: "Completed", value: 24, color: "#10b981" },
  { name: "In Progress", value: 13, color: "#3b82f6" },
  { name: "Planning", value: 8, color: "#8b5cf6" },
  { name: "On Hold", value: 5, color: "#f59e0b" },
  { name: "Cancelled", value: 2, color: "#ef4444" },
];

const workloadDistributionData = [
  { name: "Development", value: 35, color: "#3b82f6" },
  { name: "Design", value: 20, color: "#8b5cf6" },
  { name: "Marketing", value: 25, color: "#10b981" },
  { name: "Content", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const dailyActivityData = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  return {
    date: format(date, 'MMM dd'),
    tasks: Math.floor(Math.random() * 25) + 5,
    hours: Math.floor(Math.random() * 8) + 2,
  };
});

// Generate some random historical data that shows different growth rates by quarter
const revenueData = [
  { name: "Q1", revenue: 15000, costs: 10500, profit: 4500 },
  { name: "Q2", revenue: 18000, costs: 12000, profit: 6000 },
  { name: "Q3", revenue: 21000, costs: 13000, profit: 8000 },
  { name: "Q4", revenue: 24000, costs: 14500, profit: 9500 },
];

// Generate historical customer satisfaction data that shows upward trend
const satisfactionData = [
  { month: "Jan", score: 75 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 76 },
  { month: "Apr", score: 79 },
  { month: "May", score: 81 },
  { month: "Jun", score: 80 },
  { month: "Jul", score: 83 },
  { month: "Aug", score: 84 },
  { month: "Sep", score: 86 },
  { month: "Oct", score: 87 },
  { month: "Nov", score: 89 },
  { month: "Dec", score: 91 },
];

// Task completion rate data (comparing estimated vs actual time)
const taskCompletionData = [
  { category: "Research", estimated: 24, actual: 28 },
  { category: "Design", estimated: 35, actual: 32 },
  { category: "Development", estimated: 85, actual: 92 },
  { category: "Testing", estimated: 30, actual: 22 },
  { category: "Documentation", estimated: 20, actual: 26 },
  { category: "Deployment", estimated: 15, actual: 14 },
];

export function ReportsView() {
  const [timeRange, setTimeRange] = useState("year");
  const [reportType, setReportType] = useState("performance");
  
  // Dynamically select data based on time range
  const getTimeRangeData = () => {
    switch (timeRange) {
      case "month":
        return monthlyData.slice(-1);
      case "quarter":
        return monthlyData.slice(-3);
      case "half-year":
        return monthlyData.slice(-6);
      case "year":
      default:
        return monthlyData;
    }
  };
  
  const data = getTimeRangeData();
  const currentPerformance = teamPerformanceData.reduce((acc, item) => acc + item.value, 0) / teamPerformanceData.length;
  const previousPerformance = currentPerformance - Math.floor(Math.random() * 5) + 1; // Simulate previous period
  const performanceChange = currentPerformance - previousPerformance;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gain insights with detailed reports and analytics
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Select time range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="half-year">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Button variant="outline">
            <Printer className="h-4 w-4" />
          </Button>
          
          <Button variant="outline">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Performance Score
            </div>
            <div className="flex items-baseline mt-1">
              <div className="text-3xl font-bold">{Math.round(currentPerformance)}%</div>
              <div className={`text-xs ml-2 ${performanceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {performanceChange >= 0 ? (
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                )}
                {Math.abs(performanceChange).toFixed(1)}%
              </div>
            </div>
            <Progress 
              value={currentPerformance} 
              className="mt-3" 
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Compared to {Math.round(previousPerformance)}% last period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Task Completion
            </div>
            <div className="flex items-baseline mt-1">
              <div className="text-3xl font-bold">
                {data.length ? Math.round((data[data.length - 1].completed / data[data.length - 1].total) * 100) : 0}%
              </div>
              <div className="text-green-500 text-xs ml-2">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                2.5%
              </div>
            </div>
            <Progress 
              value={data.length ? (data[data.length - 1].completed / data[data.length - 1].total) * 100 : 0} 
              className="mt-3" 
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {data.length ? `${data[data.length - 1].completed} of ${data[data.length - 1].total} tasks completed` : "No data available"}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Project Success Rate
            </div>
            <div className="flex items-baseline mt-1">
              <div className="text-3xl font-bold">
                {Math.round((projectStatusData[0].value / projectStatusData.reduce((acc, item) => acc + item.value, 0)) * 100)}%
              </div>
              <div className="text-green-500 text-xs ml-2">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                4.2%
              </div>
            </div>
            <Progress 
              value={(projectStatusData[0].value / projectStatusData.reduce((acc, item) => acc + item.value, 0)) * 100} 
              className="mt-3" 
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {projectStatusData[0].value} of {projectStatusData.reduce((acc, item) => acc + item.value, 0)} projects completed successfully
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Productivity Index
            </div>
            <div className="flex items-baseline mt-1">
              <div className="text-3xl font-bold">
                {data.length ? Math.round(data[data.length - 1].performance) : 0}%
              </div>
              <div className="text-red-500 text-xs ml-2">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                1.8%
              </div>
            </div>
            <Progress 
              value={data.length ? data[data.length - 1].performance : 0} 
              className="mt-3" 
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Slightly down from 92% last month
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Reports Area */}
      <Tabs defaultValue="performance" onValueChange={setReportType}>
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="performance" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="financials" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Financials
          </TabsTrigger>
        </TabsList>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Task Completion Over Time</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Monthly performance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completed" stroke="#3b82f6" name="Completed Tasks" />
                    <Line type="monotone" dataKey="total" stroke="#6b7280" name="Total Tasks" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Overall Performance</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Efficiency and productivity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#8b5cf6" 
                      fill="#c4b5fd" 
                      name="Performance Score (%)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Daily Activity</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Task count and hours worked per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={dailyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="tasks" 
                      fill="#3b82f6" 
                      name="Tasks Completed" 
                      barSize={10} 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#f59e0b" 
                      name="Hours Worked" 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Task Estimation Accuracy</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Estimated vs actual hours by task category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={taskCompletionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estimated" fill="#3b82f6" name="Estimated Hours" />
                    <Bar dataKey="actual" fill="#10b981" name="Actual Hours" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Project Status Distribution</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Current status of all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Workload Distribution</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Hours spent by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={workloadDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      nameKey="name"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {workloadDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Project Completion Trend</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Number of projects completed monthly</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#10b981" name="Completed Projects" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Team Member Performance</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Individual performance ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={teamPerformanceData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      stroke="#94a3b8"
                    />
                    <Tooltip />
                    <Bar dataKey="value" name="Performance Score">
                      {teamPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Monthly feedback scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[70, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10b981" 
                      name="Satisfaction Score" 
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Team Workload Analysis</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Current workload distribution by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamPerformanceData.map(member => (
                    <div key={member.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {Math.round(member.value / 100 * 40)} tasks
                        </div>
                      </div>
                      <Progress 
                        value={member.value} 
                        className="h-2"
                        style={{ backgroundColor: `${member.color}20` }} // Transparent version of color
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div>{member.value}% capacity</div>
                        <div>
                          {member.value > 90 ? "Overloaded" : 
                           member.value > 80 ? "Heavy" : 
                           member.value > 60 ? "Good" : "Available"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Quarterly Revenue & Profit</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Financial performance by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" stackId="a" fill="#3b82f6" name="Revenue" />
                    <Bar dataKey="costs" stackId="a" fill="#ef4444" name="Costs" />
                    <Bar dataKey="profit" fill="#10b981" name="Profit" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Budget vs Actual Spending</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Budget allocation analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: "Used Budget", value: 145000, color: "#3b82f6" },
                        { name: "Remaining Budget", value: 55000, color: "#d1d5db" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      nameKey="name"
                      label={(entry) => `${entry.name}: $${entry.value.toLocaleString()}`}
                    >
                      {[
                        { name: "Used Budget", value: 145000, color: "#3b82f6" },
                        { name: "Remaining Budget", value: 55000, color: "#d1d5db" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Expense Breakdown by Category</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Where budget is being spent</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={[
                      { category: "Personnel", amount: 80000 },
                      { category: "Software", amount: 25000 },
                      { category: "Hardware", amount: 15000 },
                      { category: "Services", amount: 18000 },
                      { category: "Marketing", amount: 12000 },
                      { category: "Travel", amount: 5000 },
                      { category: "Office", amount: 10000 },
                      { category: "Other", amount: 3000 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Bar 
                      dataKey="amount" 
                      name="Amount" 
                      fill="#8b5cf6"
                      label={{ 
                        position: 'top', 
                        formatter: (value: number) => `$${Math.round(value / 1000)}k`
                      }}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}