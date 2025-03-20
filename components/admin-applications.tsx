"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminApplications() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])

  // Sample data for loan applications
  const applications = [
    {
      id: "LOAN-2023-089",
      customer: "John Doe",
      email: "john.doe@example.com",
      type: "Personal Loan",
      amount: 15000,
      term: 36,
      date: "2023-09-15",
      status: "pending",
      creditScore: 720,
      income: 65000,
      debtToIncome: 0.32,
    },
    {
      id: "LOAN-2023-088",
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      type: "Business Loan",
      amount: 50000,
      term: 60,
      date: "2023-09-14",
      status: "approved",
      creditScore: 780,
      income: 120000,
      debtToIncome: 0.28,
    },
    {
      id: "LOAN-2023-087",
      customer: "Robert Johnson",
      email: "robert.johnson@example.com",
      type: "Auto Loan",
      amount: 25000,
      term: 48,
      date: "2023-09-14",
      status: "rejected",
      creditScore: 620,
      income: 55000,
      debtToIncome: 0.45,
    },
    {
      id: "LOAN-2023-086",
      customer: "Emily Davis",
      email: "emily.davis@example.com",
      type: "Mortgage",
      amount: 300000,
      term: 360,
      date: "2023-09-13",
      status: "approved",
      creditScore: 760,
      income: 95000,
      debtToIncome: 0.3,
    },
    {
      id: "LOAN-2023-085",
      customer: "Michael Wilson",
      email: "michael.wilson@example.com",
      type: "Education Loan",
      amount: 20000,
      term: 60,
      date: "2023-09-13",
      status: "pending",
      creditScore: 700,
      income: 60000,
      debtToIncome: 0.35,
    },
    {
      id: "LOAN-2023-084",
      customer: "Sarah Brown",
      email: "sarah.brown@example.com",
      type: "Personal Loan",
      amount: 10000,
      term: 24,
      date: "2023-09-12",
      status: "pending",
      creditScore: 690,
      income: 58000,
      debtToIncome: 0.33,
    },
    {
      id: "LOAN-2023-083",
      customer: "David Miller",
      email: "david.miller@example.com",
      type: "Business Loan",
      amount: 75000,
      term: 60,
      date: "2023-09-12",
      status: "approved",
      creditScore: 800,
      income: 150000,
      debtToIncome: 0.25,
    },
    {
      id: "LOAN-2023-082",
      customer: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      type: "Auto Loan",
      amount: 18000,
      term: 36,
      date: "2023-09-11",
      status: "rejected",
      creditScore: 640,
      income: 52000,
      debtToIncome: 0.42,
    },
  ]

  // Filter applications based on status
  const filteredApplications = applications.filter((app) => {
    if (statusFilter === "all") return true
    return app.status === statusFilter
  })

  // Status badge styling
  const statusConfig = {
    approved: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4 text-yellow-500 mr-1" /> },
    rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4 text-red-500 mr-1" /> },
  }

  // Handle checkbox selection
  const toggleSelection = (id: string) => {
    if (selectedApplications.includes(id)) {
      setSelectedApplications(selectedApplications.filter((appId) => appId !== id))
    } else {
      setSelectedApplications([...selectedApplications, id])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    }
  }

  return (
    <AdminLayout title="Loan Applications">
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedApplications.length > 0 ? "default" : "outline"}
              disabled={selectedApplications.length === 0}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Selected
            </Button>
            <Button variant="outline" disabled={selectedApplications.length === 0}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject Selected
            </Button>
            <Button variant="outline" disabled={selectedApplications.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="text" placeholder="Search applications" className="pl-10 pr-4 w-64" />
            </div>
            <Select defaultValue="all" onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs defaultValue="all" onValueChange={setStatusFilter}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Loan Applications</CardTitle>
                  <CardDescription>
                    {statusFilter === "all"
                      ? "All loan applications"
                      : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} applications`}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
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
                          checked={
                            selectedApplications.length === filteredApplications.length &&
                            filteredApplications.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          ID
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Loan Type</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Amount
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Credit Score
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>DTI Ratio</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedApplications.includes(application.id)}
                            onCheckedChange={() => toggleSelection(application.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{application.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{application.customer}</div>
                            <div className="text-xs text-gray-500">{application.email}</div>
                          </div>
                        </TableCell>
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
                        <TableCell>
                          <div
                            className={`${
                              application.debtToIncome <= 0.3
                                ? "text-green-600"
                                : application.debtToIncome <= 0.36
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {(application.debtToIncome * 100).toFixed(0)}%
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
                Showing {filteredApplications.length} of {applications.length} applications
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
        </Tabs>

        {/* Risk Alerts */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
              Risk Alerts
            </CardTitle>
            <CardDescription>Applications that may require additional review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">High Debt-to-Income Ratio</div>
                  <div className="text-xs text-gray-700 mt-1">
                    3 applications have a debt-to-income ratio above 40%, which exceeds our standard threshold.
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Applications
                  </Button>
                </div>
              </div>

              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Borderline Credit Scores</div>
                  <div className="text-xs text-gray-700 mt-1">
                    5 applications have credit scores between 640-680, which may require manual review.
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Applications
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

