import { BarChart2, Calendar, CheckSquare, FolderKanban } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
  iconColor: string;
  timespan?: string;
  nextMeeting?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconColor,
  timespan,
  nextMeeting,
}: StatsCardProps) {
  const renderIcon = () => {
    const iconClass = `text-${iconColor}-500 text-xl`;
    
    switch (icon) {
      case "project":
        return <FolderKanban className={iconClass} />;
      case "tasks":
        return <CheckSquare className={iconClass} />;
      case "chart":
        return <BarChart2 className={iconClass} />;
      case "calendar":
        return <Calendar className={iconClass} />;
      default:
        return <BarChart2 className={iconClass} />;
    }
  };

  const bgColorClass = `bg-${iconColor}-100 dark:bg-${iconColor}-900/30`;
  
  const changeColorClass = 
    changeType === "positive" 
      ? "text-green-500" 
      : changeType === "negative" 
        ? "text-red-500" 
        : "text-gray-500";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={`text-sm ${changeColorClass} mt-1 flex items-center`}>
              {changeType === "positive" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {changeType === "negative" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {change} {timespan}
            </p>
          )}
          {nextMeeting && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Next: <span className="font-medium">{nextMeeting}</span>
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${bgColorClass} rounded-full flex items-center justify-center`}>
          {renderIcon()}
        </div>
      </div>
    </div>
  );
}
