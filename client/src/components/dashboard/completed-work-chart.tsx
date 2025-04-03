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
    name: 'Week 1', 
    bugs: 12, 
    features: 8, 
    documents: 5 
  },
  { 
    name: 'Week 2', 
    bugs: 19, 
    features: 12, 
    documents: 8 
  },
  { 
    name: 'Week 3', 
    bugs: 16, 
    features: 10, 
    documents: 6 
  },
  { 
    name: 'Week 4', 
    bugs: 14, 
    features: 15, 
    documents: 9 
  },
];

export function CompletedWorkChart() {
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
          formatter={(value) => [`${value}`, '']}
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
          dataKey="bugs" 
          name="Bugs Fixed"
          stackId="a"
          fill="#3B82F6" 
          radius={[0, 0, 0, 0]}
          barSize={20}
        />
        <Bar 
          dataKey="features" 
          name="Features Developed"
          stackId="a"
          fill="#10B981" 
          radius={[0, 0, 0, 0]}
        />
        <Bar 
          dataKey="documents" 
          name="Documents Completed"
          stackId="a"
          fill="#8B5CF6" 
          radius={[0, 0, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
