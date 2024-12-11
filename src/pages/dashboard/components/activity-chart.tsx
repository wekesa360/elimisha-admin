import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis,
  YAxis,
  Legend,
  CartesianGrid 
} from "recharts";

interface ActivityData {
  name: string;
  donations: number;
  events: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{
                stroke: 'hsl(var(--primary))',
                fill: 'hsl(var(--background))',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                stroke: 'hsl(var(--primary))',
                fill: 'hsl(var(--primary))',
                strokeWidth: 2,
                r: 6
              }}
              name="Donations"
            />
            <Line
              type="monotone"
              dataKey="events"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{
                stroke: 'hsl(var(--success))',
                fill: 'hsl(var(--background))',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                stroke: 'hsl(var(--success))',
                fill: 'hsl(var(--success))',
                strokeWidth: 2,
                r: 6
              }}
              name="Activities"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}