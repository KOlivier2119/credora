"use client"

import { useState } from "react"
import { BarChart, LineChart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import Layout from "@/components/layout"
import WorldMap from "@/components/world-map"
import MetricCard from "@/components/metric-card"
import TaskList from "@/components/task-list"

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("12month")

  // Sample data for charts
  const barData = [
    { name: "Jan", active: 8000, offline: 4000 },
    { name: "Feb", active: 12000, offline: 6000 },
    { name: "Mar", active: 5000, offline: 3000 },
    { name: "Apr", active: 15000, offline: 7000 },
    { name: "May", active: 10000, offline: 5000 },
    { name: "Jun", active: 18000, offline: 9000 },
    { name: "Jul", active: 6000, offline: 3000 },
    { name: "Aug", active: 12000, offline: 6000 },
    { name: "Sep", active: 16000, offline: 8000 },
    { name: "Oct", active: 14000, offline: 7000 },
    { name: "Nov", active: 12000, offline: 6000 },
    { name: "Dec", active: 10000, offline: 5000 },
  ]

  const lineData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 50 },
    { name: "May", value: 60 },
    { name: "Jun", value: 65 },
    { name: "Jul", value: 50 },
    { name: "Aug", value: 55 },
    { name: "Sep", value: 40 },
    { name: "Oct", value: 45 },
    { name: "Nov", value: 55 },
    { name: "Dec", value: 50 },
  ]

  const monthlyParticipationData = [
    { name: "1", value: 40 },
    { name: "2", value: 45 },
    { name: "3", value: 50 },
    { name: "4", value: 55 },
    { name: "5", value: 60 },
    { name: "6", value: 65 },
    { name: "7", value: 60 },
    { name: "8", value: 55 },
    { name: "9", value: 50 },
    { name: "10", value: 45 },
    { name: "11", value: 40 },
    { name: "12", value: 45 },
  ]

  // Calendar data
  const calendarData = {
    month: "December",
    year: 2023,
    days: Array.from({ length: 31 }, (_, i) => i + 1),
    highlightedDays: [8, 15],
    currentDay: 15,
  }

  // Tasks data
  const tasksData = {
    today: ["Send new activities of the families"],
    tomorrow: ["Get the copy for the facebook image", "Send tracker items to reload"],
    friday: ["Update style.css and add icons"],
  }

  // Metrics data
  const metricsData = [
    {
      title: "Total families",
      value: "23,000",
      change: "+1.1%",
      trend: "up",
      data: lineData,
    },
    {
      title: "Total activities",
      value: "2,878,000",
      change: "-4.6%",
      trend: "down",
      data: lineData,
    },
    {
      title: "Active families",
      value: "13,986",
      change: "+6%",
      trend: "up",
      data: lineData,
    },
    {
      title: "Average Participation",
      value: "45%",
      change: "+2%",
      trend: "up",
      data: lineData,
    },
  ]

  return (
    <Layout title="Overview">
      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              data={metric.data}
            />
          ))}
        </div>

        {/* Time Range Selector */}
        <div className="flex space-x-2">
          <Tabs defaultValue="12month" onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="12month">12 month</TabsTrigger>
              <TabsTrigger value="6month">6 month</TabsTrigger>
              <TabsTrigger value="30days">30 days</TabsTrigger>
              <TabsTrigger value="7days">7 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Charts and Calendar Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Average per month</h3>
                    <p className="text-xl font-semibold">12,000</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#0a1525]"></div>
                      <span className="text-sm">Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-sm">Offline</span>
                    </div>
                  </div>
                </div>
                <div className="h-[250px]">
                  <ChartContainer>
                    <BarChart
                      data={barData}
                      categories={["active", "offline"]}
                      colors={["#0a1525", "#e5e7eb"]}
                      valueFormatter={(value) => `${value.toLocaleString()}`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    >
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">
                      {calendarData.month} {calendarData.year}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-sm font-medium py-2">
                      {day}
                    </div>
                  ))}
                  {/* First week padding */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`empty-${i}`} className="py-2"></div>
                  ))}
                  {/* Calendar days */}
                  {calendarData.days.map((day) => (
                    <div
                      key={day}
                      className={`py-2 text-sm rounded-full w-8 h-8 mx-auto flex items-center justify-center
                        ${calendarData.currentDay === day ? "bg-[#6366f1] text-white" : ""}
                        ${calendarData.highlightedDays.includes(day) ? "bg-[#6366f1]/20" : ""}
                      `}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map and Monthly Participation Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* World Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Participation by region</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">country</span>
                    <Select defaultValue="kigali">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kigali">Kigali</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="africa">Africa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="h-[250px] relative">
                  <WorldMap />
                  <div className="absolute right-0 top-0 space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span>20,456</span>
                      <span className="ml-4 text-green-500">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>456</span>
                      <span className="ml-4 text-gray-500">Offline</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Participation */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Monthly Participation</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Total this month</span>
                      <span className="font-semibold">67,008</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-[200px]">
                  <ChartContainer>
                    <LineChart
                      data={monthlyParticipationData}
                      categories={["value"]}
                      colors={["#6366f1"]}
                      valueFormatter={(value) => `${value}%`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    >
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Tasks</h3>
                <Button variant="default" size="sm" className="bg-[#0a1525] hover:bg-[#1a2b45]">
                  EDIT
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TaskList title="Tasks today" tasks={tasksData.today} />
                <TaskList title="Tasks tomorrow" tasks={tasksData.tomorrow} />
                <TaskList title="Tasks Friday" tasks={tasksData.friday} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

