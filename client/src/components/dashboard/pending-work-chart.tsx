import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'High Priority', tasks: 12, color: '#EF4444' }, // Red
  { name: 'Medium Priority', tasks: 19, color: '#F59E0B' }, // Amber
  { name: 'Low Priority', tasks: 8, color: '#10B981' }, // Green
];

export function PendingWorkChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '0.375rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '0.875rem',
          }}
          formatter={(value) => [`${value} Tasks`, 'Number of Tasks']}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Bar 
          dataKey="tasks"
          name="Number of Tasks"
          fill={(entry) => entry.color}
          radius={[4, 4, 0, 0]}
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
