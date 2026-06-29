"use client";

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

// Define types for the props
interface ChartProps {
  data: { name: string; [key: string]: number | string }[];
  categories: string[];
  colors: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

// LineChart component using recharts directly
export function LineChart({
  data,
  categories,
  colors,
  valueFormatter = (value) => `${value}`,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {showXAxis && <XAxis dataKey="name" />}
        {showYAxis && <YAxis />}
        <Tooltip formatter={(value) => valueFormatter(Number(value))} />
        {showLegend && <Legend />}
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

// BarChart component using recharts directly
export function BarChart({
  data,
  categories,
  colors,
  valueFormatter = (value) => `${value}`,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {showXAxis && <XAxis dataKey="name" />}
        {showYAxis && <YAxis />}
        <Tooltip formatter={(value) => valueFormatter(Number(value))} />
        {showLegend && <Legend />}
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// Simple wrapper for compatibility with existing code
interface ChartContainerProps {
  children: React.ReactNode;
}

export function ChartContainer({ children }: ChartContainerProps) {
  return <>{children}</>;
}

// These components are no longer needed but kept for compatibility
interface ChartTooltipProps {
  children: React.ReactNode;
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  return <>{children}</>;
}

export function ChartTooltipContent() {
  return null;
}

export function Calendar() {
  return <div>Calendar Component</div>;
}