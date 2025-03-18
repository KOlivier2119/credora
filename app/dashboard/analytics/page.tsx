"use client"

import { useState } from "react"
import { Calendar, Download, BarChart3, LineChart, PieChart, Home, Search, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParticipantsBarChart from "@/components/ParticipantsBarChart"
import MonthlyLineChart from "@/components/MonthlyLineChart"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("last30days")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 w-full">
          <div className="flex flex-col h-screen w-full">
            <DashboardNav />
            <div className="flex-1 overflow-auto p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                  <p className="text-muted-foreground">Detailed insights and performance metrics</p>
                </div>
                <div className="flex gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="last90days">Last 90 days</SelectItem>
                      <SelectItem value="lastYear">Last year</SelectItem>
                      <SelectItem value="allTime">All time</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="participation">Participation</TabsTrigger>
                  <TabsTrigger value="demographics">Demographics</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, i) => (
                      <MetricCard key={i} metric={metric} />
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Participation Trends</CardTitle>
                        <CardDescription>Monthly participation rates</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <MonthlyLineChart />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Activity Breakdown</CardTitle>
                        <CardDescription>Participation by activity type</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ParticipantsBarChart />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="participation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Participation Analysis</CardTitle>
                      <CardDescription>Comprehensive view of participation metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-lg">
                        <p className="text-muted-foreground">Detailed participation charts would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="demographics" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Demographic Breakdown</CardTitle>
                      <CardDescription>Analysis of participant demographics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-lg">
                        <p className="text-muted-foreground">Demographic charts would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activities" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Performance</CardTitle>
                      <CardDescription>Metrics and analysis by activity type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-lg">
                        <p className="text-muted-foreground">Activity performance charts would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar className="h-screen bg-[#061525]">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">Credora</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/families")}>
                  <Link href="/dashboard/families">
                    <Users className="h-4 w-4" />
                    <span>Families</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/activities")}>
                  <Link href="/dashboard/activities">
                    <Calendar className="h-4 w-4" />
                    <span>Activities</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/analytics")}>
                  <Link href="/dashboard/analytics">
                    <LineChart className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function DashboardNav() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <div className="relative max-w-md flex-1 md:ml-auto md:mr-8">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-background pl-8 md:w-[240px] lg:w-[440px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function Menu({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MetricCard({ metric }: { metric: (typeof metrics)[0] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <metric.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className="text-xs text-muted-foreground">{metric.description}</p>
      </CardContent>
    </Card>
  )
}

const metrics = [
  {
    title: "Total Participants",
    value: "12,345",
    description: "+12% from previous period",
    icon: BarChart3,
  },
  {
    title: "Average Attendance",
    value: "78%",
    description: "+5% from previous period",
    icon: LineChart,
  },
  {
    title: "Active Families",
    value: "1,234",
    description: "65% of total families",
    icon: PieChart,
  },
  {
    title: "Activities Completed",
    value: "256",
    description: "Last 30 days",
    icon: Calendar,
  },
]

