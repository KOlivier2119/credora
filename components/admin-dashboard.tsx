"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, ChartContainer } from "@/components/ui/charts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("7d")
  const [applicationFilter, setApplicationFilter] = useState("all")

  // Sample data for dashboard metrics
  const dashboardMetrics = {
    totalApplications: 124,
    applicationsTrend: 12,
    pendingApplications: 28,
    pendingTrend: 5,
    approvedApplications: 82,
    approvedTrend: 8,
    rejectedApplications: 14,
    rejectedTrend: -2,
    totalLoanAmount: 2450000,
    amountTrend: 15,
    averageInterestRate: 5.4,
    rateTrend: -0.2,
    activeCustomers: 215,
    customersTrend: 7,
    defaultRate: 2.1,
    defaultTrend: -0.3,
  }

  // Sample data for application trend chart
  const applicationTrendData = [
    { name: "Jan", pending: 15, approved: 45, rejected: 8 },
    { name: "Feb", pending: 18, approved: 50, rejected: 10 },
    { name: "Mar", pending: 20, approved: 55, rejected: 7 },
    { name: "Apr", pending: 22, approved: 60, rejected: 9 },
    { name: "May", pending: 25, approved: 65, rejected: 11 },
    { name: "Jun", pending: 28, approved: 70, rejected: 12 },
    { name: "Jul", pending: 30, approved: 75, rejected: 10 },
    { name: "Aug", pending: 25, approved: 80, rejected: 8 },
    { name: "Sep", pending: 28, approved: 82, rejected: 14 },
  ]

  // Sample data for loan amount distribution
  const loanDistributionData = [
    { name: "Personal", value: 850000 },
    { name: "Business", value: 1200000 },
    { name: "Mortgage", value: 3500000 },
    { name: "Auto", value: 650000 },
    { name: "Education", value: 450000 },
  ]

  // Sample data for recent applications
  const recentApplications = [
    {
      id: "LOAN-2023-089",
      customer: "John Doe",
      type: "Personal Loan",
      amount: 15000,
      date: "2023-09-15",
      status: "pending",
      creditScore: 720,
    },
    {
      id: "LOAN-2023-088",
      customer: "Jane Smith",
      type: "Business Loan",
      amount: 50000,
      date: "2023-09-14",
      status: "approved",
      creditScore: 780,
    },
    {
      id: "LOAN-2023-087",
      customer: "Robert Johnson",
      type: "Auto Loan",
      amount: 25000,
      date: "2023-09-14",
      status: "rejected",
      creditScore: 620,
    },
    {
      id: "LOAN-2023-086",
      customer: "Emily Davis",
      type: "Mortgage",
      amount: 300000,
      date: "2023-09-13",
      status: "approved",
      creditScore: 760,
    },
    {
      id: "LOAN-2023-085",
      customer: "Michael Wilson",
      type: "Education Loan",
      amount: 20000,
      date: "2023-09-13",
      status: "pending",
      creditScore: 700,
    },
  ]

  // Filter applications based on status
  const filteredApplications =
    applicationFilter === "all"
      ? recentApplications
      : recentApplications.filter((app) => app.status === applicationFilter)

  // Status badge styling
  const statusConfig = {
    approved: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4 text-yellow-500 mr-1" /> },
    rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4 text-red-500 mr-1" /> },
  }

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Loan Management Dashboard</h1>
            <p className="text-gray-500">Overview of loan applications and performance metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Select defaultValue="7d" onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Applications</p>
                  <p className="text-2xl font-bold">{dashboardMetrics.totalApplications}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.applicationsTrend > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {dashboardMetrics.applicationsTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.applicationsTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
                <CreditCard className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Loan Amount</p>
                  <p className="text-2xl font-bold">${(dashboardMetrics.totalLoanAmount / 1000000).toFixed(2)}M</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.amountTrend > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {dashboardMetrics.amountTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.amountTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
                <DollarSign className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Active Customers</p>
                  <p className="text-2xl font-bold">{dashboardMetrics.activeCustomers}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.customersTrend > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {dashboardMetrics.customersTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.customersTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
                <Users className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Default Rate</p>
                  <p className="text-2xl font-bold">{dashboardMetrics.defaultRate}%</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.defaultTrend < 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {dashboardMetrics.defaultTrend < 0 ? (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.defaultTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
                <AlertCircle className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Status Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-yellow-700">Pending Applications</p>
                  <p className="text-2xl font-bold text-yellow-800">{dashboardMetrics.pendingApplications}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.pendingTrend > 0 ? "text-yellow-700" : "text-green-600"}`}
                >
                  {dashboardMetrics.pendingTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.pendingTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-yellow-700">Requires review</span>
                <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-100">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-700">Approved Applications</p>
                  <p className="text-2xl font-bold text-green-800">{dashboardMetrics.approvedApplications}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.approvedTrend > 0 ? "text-green-700" : "text-red-600"}`}
                >
                  {dashboardMetrics.approvedTrend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.approvedTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-green-700">Approval rate: 66%</span>
                <Button size="sm" variant="outline" className="border-green-500 text-green-700 hover:bg-green-100">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-red-700">Rejected Applications</p>
                  <p className="text-2xl font-bold text-red-800">{dashboardMetrics.rejectedApplications}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${dashboardMetrics.rejectedTrend < 0 ? "text-green-600" : "text-red-700"}`}
                >
                  {dashboardMetrics.rejectedTrend < 0 ? (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(dashboardMetrics.rejectedTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-red-700">Rejection rate: 11%</span>
                <Button size="sm" variant="outline" className="border-red-500 text-red-700 hover:bg-red-100">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Monthly application volume by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <BarChart
                    data={applicationTrendData}
                    categories={["pending", "approved", "rejected"]}
                    colors={["#f59e0b", "#10b981", "#ef4444"]}
                    valueFormatter={(value) => `${value}`}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                  />
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Distribution</CardTitle>
              <CardDescription>Total loan amount by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <BarChart
                    data={loanDistributionData}
                    categories={["value"]}
                    colors={["#3b82f6"]}
                    valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                  />
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest loan applications received</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="text" placeholder="Search applications" className="pl-10 pr-4 w-64" />
                </div>
                <Select defaultValue="all" onValueChange={setApplicationFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.customer}</TableCell>
                      <TableCell>{application.type}</TableCell>
                      <TableCell>${application.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {application.creditScore}
                          <div
                            className={`ml-2 w-2 h-2 rounded-full ${
                              application.creditScore >= 740
                                ? "bg-green-500"
                                : application.creditScore >= 670
                                  ? "bg-blue-500"
                                  : application.creditScore >= 580
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={statusConfig[application.status as keyof typeof statusConfig].color}>
                          <div className="flex items-center">
                            {statusConfig[application.status as keyof typeof statusConfig].icon}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {application.status === "pending" && (
                            <>
                              <Button variant="ghost" size="icon" className="text-green-500">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredApplications.length} of {recentApplications.length} applications
            </div>
            <Button variant="outline">
              View All Applications
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>

        {/* Alerts and Notifications */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-500" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">High Volume of Pending Applications</div>
                  <div className="text-xs text-gray-700 mt-1">
                    There are 28 pending applications that require review. Consider allocating more resources to
                    application processing.
                  </div>
                </div>
              </div>

              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Approval Rate Increased</div>
                  <div className="text-xs text-gray-700 mt-1">
                    The loan approval rate has increased by 5% compared to the previous month. This indicates improved
                    application quality.
                  </div>
                </div>
              </div>

              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Monthly Risk Assessment Due</div>
                  <div className="text-xs text-gray-700 mt-1">
                    The monthly risk assessment report is due in 3 days. Please ensure all loan data is up to date.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

