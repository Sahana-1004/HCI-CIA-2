import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const data = [
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

export function ProjectSuccessChart() {
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
          domain={[0, 100]}
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
          iconType="rect"
          wrapperStyle={{ fontSize: '0.75rem' }}
        />
        <Bar 
          dataKey="success" 
          name="Success Rate (%)"
          fill="#10B981" 
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
        <Bar 
          dataKey="failure" 
          name="Failure Rate (%)"
          fill="#EF4444" 
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
