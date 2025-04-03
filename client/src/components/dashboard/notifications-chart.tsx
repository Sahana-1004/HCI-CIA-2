import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

const data = [
  { name: 'Mentions', value: 28, color: '#3B82F6' }, // Blue
  { name: 'Meeting Reminders', value: 12, color: '#10B981' }, // Green
  { name: 'Deadlines', value: 7, color: '#EF4444' }, // Red
  { name: 'Project Updates', value: 35, color: '#8B5CF6' }, // Purple
];

export function NotificationsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke="none"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '0.375rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '0.875rem',
          }}
          formatter={(value) => [`${value}`, '']}
          labelStyle={{ fontWeight: 'bold' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
