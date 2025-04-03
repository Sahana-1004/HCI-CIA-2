import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend
} from 'recharts';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: DataItem[];
  dataKey?: string;
  nameKey?: string;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  height?: number;
  className?: string;
}

export function PieChart({
  data,
  dataKey = 'value',
  nameKey = 'name',
  innerRadius = 0,
  outerRadius = 80,
  showLegend = false,
  height = 300,
  className,
}: PieChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey={dataKey}
            nameKey={nameKey}
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
          {showLegend && (
            <Legend 
              verticalAlign="bottom"
              height={36}
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ fontSize: '0.75rem' }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
