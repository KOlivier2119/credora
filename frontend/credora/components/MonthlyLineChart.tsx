"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function MonthlyLineChart() {
  const data = [
    { day: 1, participation: 20 },
    { day: 5, participation: 40 },
    { day: 10, participation: 35 },
    { day: 15, participation: 50 },
    { day: 20, participation: 45 },
    { day: 25, participation: 60 },
    { day: 30, participation: 67 },
  ]

  return (
    <ChartContainer
      config={{
        participation: {
          label: "Total Participation",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
            label={{
              value: "Day of Month",
              position: "insideBottom",
              offset: -10,
              fontSize: 12,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Line
            type="monotone"
            dataKey="participation"
            stroke="var(--color-participation)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-participation)",
              r: 4,
            }}
            activeDot={{
              fill: "var(--color-participation)",
              r: 6,
              strokeWidth: 2,
              stroke: "hsl(var(--background))",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

