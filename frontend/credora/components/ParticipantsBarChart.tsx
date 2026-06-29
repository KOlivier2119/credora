"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ParticipantsBarChart() {
  const data = [
    { month: "Jan", active: 1500, offline: 800 },
    { month: "Feb", active: 2100, offline: 1000 },
    { month: "Mar", active: 2400, offline: 1200 },
    { month: "Apr", active: 3000, offline: 1500 },
    { month: "May", active: 2900, offline: 1300 },
    { month: "Jun", active: 4100, offline: 1800 },
    { month: "Jul", active: 3800, offline: 1700 },
    { month: "Aug", active: 4500, offline: 2000 },
    { month: "Sep", active: 3200, offline: 1400 },
    { month: "Oct", active: 4000, offline: 1900 },
    { month: "Nov", active: 3600, offline: 1600 },
    { month: "Dec", active: 4800, offline: 2200 },
  ]

  return (
    <ChartContainer
      config={{
        active: {
          label: "Active",
          color: "hsl(var(--chart-1))",
        },
        offline: {
          label: "Offline",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 20,
          }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Bar dataKey="active" fill="var(--color-active)" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="offline" fill="var(--color-offline)" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

