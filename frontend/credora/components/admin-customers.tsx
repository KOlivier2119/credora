"use client"

import { useState, useEffect, useMemo } from "react"
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
import { api, CustomerSummary } from "@/lib/api"

export default function AdminCustomers() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [customers, setCustomers] = useState<CustomerSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get<CustomerSummary[]>("/admin/customers")
      .then((r) => setCustomers(r.data))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter
      const q = search.toLowerCase()
      const matchSearch = !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
      return matchStatus && matchSearch
    })
  }, [customers, statusFilter, search])

  const customerMetrics = useMemo(() => ({
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    flagged: customers.filter((c) => c.status === "flagged").length,
  }), [customers])

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
      setSelectedCustomers(filteredCustomers.map((customer) => String(customer.id)))
    }
  }

  return (
    <AdminLayout title="Customer Management">
      <div className="space-y-6">
        {loading && <p className="text-sm text-gray-500">Loading customers...</p>}
        {/* Customer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-2xl font-bold">{customerMetrics.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-700">Active Customers</p>
                  <p className="text-2xl font-bold text-green-800">{customerMetrics.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-700">Inactive Customers</p>
                  <p className="text-2xl font-bold text-gray-800">{customerMetrics.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-red-700">Flagged Accounts</p>
                  <p className="text-2xl font-bold text-red-800">{customerMetrics.flagged}</p>
                </div>
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
                          checked={selectedCustomers.includes(String(customer.id))}
                          onCheckedChange={() => toggleSelection(String(customer.id))}
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
                      <TableCell>${Number(customer.totalBorrowed || 0).toLocaleString()}</TableCell>
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

