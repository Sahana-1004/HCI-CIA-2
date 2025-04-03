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

interface DataItem {
  name: string;
  [key: string]: string | number;
}

interface StackedBarChartProps {
  data: DataItem[];
  dataKeys: { key: string; name: string; color: string }[];
  xAxisKey: string;
  showLegend?: boolean;
  height?: number;
  className?: string;
}

export function StackedBarChart({
  data,
  dataKeys,
  xAxisKey,
  showLegend = true,
  height = 300,
  className,
}: StackedBarChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={xAxisKey} 
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
          />
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36}
              iconSize={10}
              iconType="rect"
              wrapperStyle={{ fontSize: '0.75rem' }}
            />
          )}
          {dataKeys.map((dataKey) => (
            <Bar 
              key={dataKey.key}
              dataKey={dataKey.key} 
              name={dataKey.name}
              stackId="a"
              fill={dataKey.color} 
              radius={[0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
