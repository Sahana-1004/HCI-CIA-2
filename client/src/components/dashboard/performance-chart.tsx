import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const data = [
  { name: 'Jan', completion: 65, efficiency: 70 },
  { name: 'Feb', completion: 59, efficiency: 62 },
  { name: 'Mar', completion: 80, efficiency: 75 },
  { name: 'Apr', completion: 81, efficiency: 79 },
  { name: 'May', completion: 76, efficiency: 84 },
  { name: 'Jun', completion: 85, efficiency: 88 },
];

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          domain={[50, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '0.375rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '0.875rem',
          }}
          formatter={(value) => [`${value}%`, '']}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend 
          verticalAlign="top" 
          height={36}
          iconSize={10}
          iconType="circle"
          wrapperStyle={{ fontSize: '0.75rem' }}
        />
        <Line 
          type="monotone" 
          dataKey="completion" 
          name="Task Completion Rate"
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="efficiency" 
          name="Efficiency Score"
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
