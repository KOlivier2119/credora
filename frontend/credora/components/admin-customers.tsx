"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminCustomers() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  // Sample data for customers
  const customers = [
    {
      id: "CUST-2023-001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      joinDate: "2023-01-15",
      creditScore: 720,
      activeLoans: 1,
      totalBorrowed: 15000,
      lastActivity: "2023-09-10",
    },
    {
      id: "CUST-2023-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      joinDate: "2023-02-20",
      creditScore: 780,
      activeLoans: 2,
      totalBorrowed: 65000,
      lastActivity: "2023-09-15",
    },
    {
      id: "CUST-2023-003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
      status: "inactive",
      joinDate: "2023-03-05",
      creditScore: 620,
      activeLoans: 0,
      totalBorrowed: 25000,
      lastActivity: "2023-07-22",
    },
    {
      id: "CUST-2023-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 789-0123",
      status: "active",
      joinDate: "2023-03-18",
      creditScore: 760,
      activeLoans: 1,
      totalBorrowed: 300000,
      lastActivity: "2023-09-12",
    },
    {
      id: "CUST-2023-005",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      joinDate: "2023-04-02",
      creditScore: 700,
      activeLoans: 1,
      totalBorrowed: 20000,
      lastActivity: "2023-09-08",
    },
    {
      id: "CUST-2023-006",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      phone: "+1 (555) 345-6789",
      status: "flagged",
      joinDate: "2023-04-15",
      creditScore: 690,
      activeLoans: 1,
      totalBorrowed: 10000,
      lastActivity: "2023-08-30",
    },
    {
      id: "CUST-2023-007",
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "+1 (555) 567-8901",
      status: "active",
      joinDate: "2023-05-10",
      creditScore: 800,
      activeLoans: 1,
      totalBorrowed: 75000,
      lastActivity: "2023-09-14",
    },
    {
      id: "CUST-2023-008",
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      phone: "+1 (555) 678-9012",
      status: "inactive",
      joinDate: "2023-05-25",
      creditScore: 640,
      activeLoans: 0,
      totalBorrowed: 18000,
      lastActivity: "2023-06-18",
    },
  ]

  // Filter customers based on status
  const filteredCustomers = customers.filter((customer) => {
    if (statusFilter === "all") return true
    return customer.status === statusFilter
  })

  // Status badge styling
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800" },
    inactive: { color: "bg-gray-100 text-gray-800" },
    flagged: { color: "bg-red-100 text-red-800" },
  }

  // Handle checkbox selection
  const toggleSelection = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter((custId) => custId !== id))
    } else {
      setSelectedCustomers([...selectedCustomers, id])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
    }
  }

  // Customer metrics
  const customerMetrics = {
    totalCustomers: 215,
    customersTrend: 7,
    activeCustomers: 185,
    activeTrend: 5,
    inactiveCustomers: 30,
    inactiveTrend: 2,
    flaggedCustomers: 8,
    flaggedTrend: -1,
  }

  return (
    <AdminLayout title="Customer Management">
      <div className="space-y-6">
        {/* Customer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-2xl font-bold">{customerMetrics.totalCustomers}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${customerMetrics.customersTrend > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {customerMetrics.customersTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(customerMetrics.customersTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-700">Active Customers</p>
                  <p className="text-2xl font-bold text-green-800">{customerMetrics.activeCustomers}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${customerMetrics.activeTrend > 0 ? "text-green-700" : "text-red-600"}`}
                >
                  {customerMetrics.activeTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(customerMetrics.activeTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-green-700">
                <span>86% of total customers</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-700">Inactive Customers</p>
                  <p className="text-2xl font-bold text-gray-800">{customerMetrics.inactiveCustomers}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${customerMetrics.inactiveTrend > 0 ? "text-yellow-600" : "text-green-600"}`}
                >
                  {customerMetrics.inactiveTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(customerMetrics.inactiveTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-700">
                <span>14% of total customers</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-red-700">Flagged Accounts</p>
                  <p className="text-2xl font-bold text-red-800">{customerMetrics.flaggedCustomers}</p>
                </div>
                <div
                  className={`flex items-center text-sm ${customerMetrics.flaggedTrend < 0 ? "text-green-600" : "text-red-700"}`}
                >
                  {customerMetrics.flaggedTrend < 0 ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(customerMetrics.flaggedTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-red-700">
                <span>Requires attention</span>
                <Button size="sm" variant="outline" className="border-red-500 text-red-700 hover:bg-red-100">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
            <Button variant="outline" disabled={selectedCustomers.length === 0}>
              <Mail className="h-4 w-4 mr-2" />
              Email Selected
            </Button>
            <Button variant="outline" disabled={selectedCustomers.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="text" placeholder="Search customers" className="pl-10 pr-4 w-64" />
            </div>
            <Select defaultValue="all" onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customer Accounts</CardTitle>
                <CardDescription>
                  {statusFilter === "all"
                    ? "All customer accounts"
                    : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} customer accounts`}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Customer
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Credit Score
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Active Loans
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Total Borrowed
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => toggleSelection(customer.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="font-medium text-blue-700">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-gray-500">{customer.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-2 text-gray-500" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-2 text-gray-500" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {customer.creditScore}
                          <div
                            className={`ml-2 w-2 h-2 rounded-full ${
                              customer.creditScore >= 740
                                ? "bg-green-500"
                                : customer.creditScore >= 670
                                  ? "bg-blue-500"
                                  : customer.creditScore >= 580
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                          {customer.activeLoans}
                        </div>
                      </TableCell>
                      <TableCell>${customer.totalBorrowed.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {new Date(customer.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[customer.status as keyof typeof statusConfig].color}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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
              Showing {filteredCustomers.length} of {customers.length} customers
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Customer Alerts */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
              Customer Insights
            </CardTitle>
            <CardDescription>Important information about your customer base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Inactive Customer Follow-up</div>
                  <div className="text-xs text-gray-700 mt-1">
                    30 customers have been inactive for over 90 days. Consider sending a re-engagement email campaign.
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Inactive Customers
                  </Button>
                </div>
              </div>

              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">High-Value Customer Opportunity</div>
                  <div className="text-xs text-gray-700 mt-1">
                    15 customers have excellent credit scores (750+) but only one active loan. These customers may be
                    good candidates for additional loan products.
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Opportunities
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

