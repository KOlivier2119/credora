"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calendar,
  Home,
  LineChart,
  Search,
  Settings,
  Users,
} from "lucide-react";

import ParticipantsBarChart from "../../components/ParticipantsBarChart"
import MonthlyLineChart from "@/components/MonthlyLineChart";
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
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 w-full">
          <div className="flex flex-col h-screen w-full">
            <DashboardNav />
            <div className="flex-1 overflow-auto p-6 md:p-8 w-full">
              <Tabs
                defaultValue="overview"
                className="space-y-6"
                onValueChange={setActiveTab}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                      Monitor your organization's performance and activity
                    </p>
                  </div>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-6">
                  <StatsCards />
                  <Charts activeTab={activeTab} />
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <p className="text-muted-foreground">
                      Analytics content would appear here
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="reports">
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <p className="text-muted-foreground">
                      Reports content would appear here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function DashboardSidebar() {
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
                <SidebarMenuButton isActive tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Families">
                  <Users className="h-4 w-4" />
                  <span>Families</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Activities">
                  <Calendar className="h-4 w-4" />
                  <span>Activities</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <LineChart className="h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
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
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar"
              />
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
  );
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
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Avatar"
                  />
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
  );
}

function StatsCards() {
  const stats = [
    {
      title: "Total Families",
      value: "23,000",
      trend: "+13%",
      isPositive: true,
      icon: Users,
      color: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
      trendColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Total Activities",
      value: "2,878,000",
      trend: "-4.6%",
      isPositive: false,
      icon: Calendar,
      color: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
      trendColor: "text-red-600 dark:text-red-400",
    },
    {
      title: "Active Families",
      value: "13,986",
      trend: "+45%",
      isPositive: true,
      icon: Users,
      color: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
      trendColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Average Participation",
      value: "45%",
      trend: "+45%",
      isPositive: true,
      icon: BarChart3,
      color: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600 dark:text-amber-400",
      trendColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {stats.map((stat, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0 pb-2 ${stat.color}`}
          >
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`rounded-full p-2 ${stat.color}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              <span className={stat.trendColor}>
                {stat.isPositive ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
              </span>
              <span className={stat.trendColor}>{stat.trend}</span>
              <span className="text-muted-foreground">since last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Charts({ activeTab }: { activeTab: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 w-full">
      <ParticipantsChart />
      <MonthlyParticipationChart />
    </div>
  );
}

function ParticipantsChart() {
  return (
    <Card className="col-span-1 w-full">
      <CardHeader>
        <CardTitle>Total Participants</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-3xl font-bold mb-4">12,000</div>
        <div className="h-[300px]">
          <ParticipantsBarChart />
        </div>
      </CardContent>
    </Card>
  );
}

function MonthlyParticipationChart() {
  return (
    <Card className="col-span-1 w-full">
      <CardHeader>
        <CardTitle>Monthly Participation</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[340px]">
          <MonthlyLineChart />
        </div>
      </CardContent>
    </Card>
  );
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
  );
}
