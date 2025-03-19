import { Card, CardContent } from "@/components/ui/card"
import { LineChart, ChartContainer } from "@/components/ui/charts"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  data: { name: string; value: number }[]
}

export default function MetricCard({ title, value, change, trend, data }: MetricCardProps) {
  const bgColors = {
    "Total families": "bg-blue-50",
    "Total activities": "bg-purple-50",
    "Active families": "bg-green-50",
    "Average Participation": "bg-amber-50",
  }

  const lineColors = {
    "Total families": "#6366f1",
    "Total activities": "#8b5cf6",
    "Active families": "#10b981",
    "Average Participation": "#f59e0b",
  }

  return (
    <Card className={`border-none ${bgColors[title as keyof typeof bgColors]}`}>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{value}</p>
            <div className={`flex items-center text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {trend === "up" ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {change}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Since last month</span>
          </div>
          <div className="h-[50px] mt-2">
            <ChartContainer>
              <LineChart
                data={data}
                categories={["value"]}
                colors={[lineColors[title as keyof typeof lineColors]]}
                showLegend={false}
                showXAxis={false}
                showYAxis={false}
              />
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

