import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  workload: number;
  status: "Available" | "Good" | "Heavy" | "Overloaded";
}

const teamMembers: TeamMember[] = [
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

const getStatusColor = (status: TeamMember["status"]) => {
  switch (status) {
    case "Available":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "Good":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "Heavy":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Overloaded":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }
};

const getWorkloadColor = (workload: number) => {
  if (workload < 50) return "bg-blue-500";
  if (workload < 70) return "bg-green-500";
  if (workload < 85) return "bg-yellow-500";
  return "bg-red-500";
};

export function WorkloadDistribution() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Team Member
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Workload
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{member.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{member.role}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`${getWorkloadColor(member.workload)} h-2.5 rounded-full`} 
                    style={{ width: `${member.workload}%` }}
                  ></div>
                </div>
                <div className="text-xs text-center mt-1">{member.workload}%</div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  getStatusColor(member.status)
                )}>
                  {member.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
