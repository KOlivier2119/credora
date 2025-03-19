"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts"
import { Download, Filter, Search, ArrowUpDown, Eye, FileText, DollarSign, Clock, CheckCircle2 } from "lucide-react"
import Layout from "@/components/layout"

export default function ManageLoans() {
  const [activeTab, setActiveTab] = useState("all")

  // Sample data for loans
  const loans = [
    {
      id: "LOAN-2023-001",
      amount: 15000,
      term: 36,
      purpose: "Home Improvement",
      status: "active",
      nextPayment: "2023-12-15",
      remainingAmount: 12500,
      interestRate: 5.2,
      startDate: "2023-01-15",
    },
    {
      id: "LOAN-2023-002",
      amount: 8000,
      term: 24,
      purpose: "Debt Consolidation",
      status: "active",
      nextPayment: "2023-12-10",
      remainingAmount: 5200,
      interestRate: 4.8,
      startDate: "2023-03-10",
    },
    {
      id: "LOAN-2023-003",
      amount: 25000,
      term: 60,
      purpose: "Business",
      status: "pending",
      nextPayment: "-",
      remainingAmount: 25000,
      interestRate: 6.1,
      startDate: "-",
    },
    {
      id: "LOAN-2022-045",
      amount: 12000,
      term: 36,
      purpose: "Education",
      status: "completed",
      nextPayment: "-",
      remainingAmount: 0,
      interestRate: 4.5,
      startDate: "2022-05-20",
    },
    {
      id: "LOAN-2023-004",
      amount: 5000,
      term: 12,
      purpose: "Medical Expenses",
      status: "active",
      nextPayment: "2023-12-22",
      remainingAmount: 2100,
      interestRate: 4.2,
      startDate: "2023-06-22",
    },
  ]

  // Sample data for payment history chart
  const paymentHistoryData = [
    { name: "Jan", value: 450 },
    { name: "Feb", value: 450 },
    { name: "Mar", value: 450 },
    { name: "Apr", value: 450 },
    { name: "May", value: 450 },
    { name: "Jun", value: 450 },
    { name: "Jul", value: 450 },
    { name: "Aug", value: 450 },
    { name: "Sep", value: 450 },
    { name: "Oct", value: 450 },
    { name: "Nov", value: 450 },
    { name: "Dec", value: 450 },
  ]

  // Filter loans based on active tab
  const filteredLoans = activeTab === "all" ? loans : loans.filter((loan) => loan.status === activeTab)

  // Status badge color mapping
  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
  }

  // Status icon mapping
  const statusIcons = {
    active: <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />,
    pending: <Clock className="h-4 w-4 text-yellow-500 mr-1" />,
    completed: <CheckCircle2 className="h-4 w-4 text-blue-500 mr-1" />,
  }

  return (
    <Layout title="Manage Loans">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Active Loans</span>
                <span className="text-2xl font-bold">3</span>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <span>$19,800 outstanding</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Pending Applications</span>
                <span className="text-2xl font-bold">1</span>
                <div className="flex items-center mt-2 text-sm text-yellow-500">
                  <span>Under review</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Next Payment Due</span>
                <span className="text-2xl font-bold">Dec 10, 2023</span>
                <div className="flex items-center mt-2 text-sm text-blue-500">
                  <span>$450 payment amount</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Completed Loans</span>
                <span className="text-2xl font-bold">1</span>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>Good standing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Management Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Loans</CardTitle>
                <CardDescription>Manage and track all your loans</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search loans"
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Loans</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center">
                          Loan ID
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Amount
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Payment</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{loan.id}</TableCell>
                        <TableCell>${loan.amount.toLocaleString()}</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>{loan.term} months</TableCell>
                        <TableCell>
                          <Badge className={statusColors[loan.status as keyof typeof statusColors]}>
                            <div className="flex items-center">
                              {statusIcons[loan.status as keyof typeof statusIcons]}
                              {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {loan.nextPayment === "-" ? "-" : new Date(loan.nextPayment).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${loan.remainingAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment History Section */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track your loan payment history over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <LineChart
                  data={paymentHistoryData}
                  categories={["value"]}
                  colors={["#6366f1"]}
                  valueFormatter={(value) => `$${value}`}
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

        {/* Upcoming Payments Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Schedule of your next loan payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Loan #LOAN-2023-002</div>
                    <div className="text-sm text-gray-500">Debt Consolidation</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">$450</div>
                  <div className="text-sm text-gray-500">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Dec 10, 2023</div>
                  <div className="text-sm text-gray-500">Due Date</div>
                </div>
                <div>
                  <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Make Payment</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Loan #LOAN-2023-001</div>
                    <div className="text-sm text-gray-500">Home Improvement</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">$520</div>
                  <div className="text-sm text-gray-500">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Dec 15, 2023</div>
                  <div className="text-sm text-gray-500">Due Date</div>
                </div>
                <div>
                  <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Make Payment</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Loan #LOAN-2023-004</div>
                    <div className="text-sm text-gray-500">Medical Expenses</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">$380</div>
                  <div className="text-sm text-gray-500">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Dec 22, 2023</div>
                  <div className="text-sm text-gray-500">Due Date</div>
                </div>
                <div>
                  <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Make Payment</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

