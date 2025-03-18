"use client"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  BarChart3,
  Home,
  LineChart,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
                  <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
                  <p className="text-muted-foreground">Browse and manage all scheduled activities</p>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Activity
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search activities..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="flex gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="upcoming" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activities
                      .filter((activity) => new Date(activity.date) >= new Date())
                      .map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="past" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activities
                      .filter((activity) => new Date(activity.date) < new Date())
                      .map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="all" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity) => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))}
                  </div>
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

function ActivityCard({ activity }: { activity: (typeof activities)[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{activity.title}</CardTitle>
          <Badge variant={activity.status === "Active" ? "default" : "outline"}>{activity.status}</Badge>
        </div>
        <CardDescription>{activity.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{activity.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{activity.participants} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
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

const activities = [
  {
    id: 1,
    title: "Summer Camp",
    description: "A week-long outdoor adventure for kids",
    date: "2025-07-15",
    time: "9:00 AM - 4:00 PM",
    location: "Pine Valley Park",
    participants: 45,
    status: "Active",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Family Game Night",
    description: "Fun board games for the whole family",
    date: "2025-04-10",
    time: "6:00 PM - 9:00 PM",
    location: "Community Center",
    participants: 28,
    status: "Active",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Parent Workshop",
    description: "Educational workshop on child development",
    date: "2025-03-05",
    time: "10:00 AM - 12:00 PM",
    location: "Main Library",
    participants: 32,
    status: "Inactive",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Science Fair",
    description: "Annual science project showcase",
    date: "2024-12-15",
    time: "1:00 PM - 5:00 PM",
    location: "Elementary School Gym",
    participants: 65,
    status: "Completed",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Holiday Celebration",
    description: "End of year family gathering",
    date: "2024-12-20",
    time: "5:00 PM - 8:00 PM",
    location: "Community Hall",
    participants: 120,
    status: "Completed",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Spring Picnic",
    description: "Outdoor lunch and activities",
    date: "2025-05-22",
    time: "11:00 AM - 3:00 PM",
    location: "Riverside Park",
    participants: 75,
    status: "Active",
    image: "/placeholder.svg?height=200&width=400",
  },
]

