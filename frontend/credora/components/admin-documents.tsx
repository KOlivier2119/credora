"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  FilePlus,
  Trash2,
  Share2,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminDocuments() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  // Sample data for documents
  const documents = [
    {
      id: "DOC-2023-001",
      name: "Loan Agreement - John Doe",
      category: "agreement",
      customer: "John Doe",
      customerId: "CUST-2023-001",
      loanId: "LOAN-2023-001",
      uploadDate: "2023-09-15",
      status: "verified",
      size: "1.2 MB",
      type: "PDF",
    },
    {
      id: "DOC-2023-002",
      name: "Income Verification - Jane Smith",
      category: "verification",
      customer: "Jane Smith",
      customerId: "CUST-2023-002",
      loanId: "LOAN-2023-002",
      uploadDate: "2023-09-14",
      status: "verified",
      size: "0.8 MB",
      type: "PDF",
    },
    {
      id: "DOC-2023-003",
      name: "Credit Report - Robert Johnson",
      category: "credit",
      customer: "Robert Johnson",
      customerId: "CUST-2023-003",
      loanId: "LOAN-2023-003",
      uploadDate: "2023-09-14",
      status: "pending",
      size: "1.5 MB",
      type: "PDF",
    },
    {
      id: "DOC-2023-004",
      name: "Property Appraisal - Emily Davis",
      category: "appraisal",
      customer: "Emily Davis",
      customerId: "CUST-2023-004",
      loanId: "LOAN-2023-004",
      uploadDate: "2023-09-13",
      status: "verified",
      size: "3.2 MB",
      type: "PDF",
    },
    {
      id: "DOC-2023-005",
      name: "ID Verification - Michael Wilson",
      category: "verification",
      customer: "Michael Wilson",
      customerId: "CUST-2023-005",
      loanId: "LOAN-2023-005",
      uploadDate: "2023-09-13",
      status: "pending",
      size: "0.5 MB",
      type: "JPG",
    },
    {
      id: "DOC-2023-006",
      name: "Bank Statements - Sarah Brown",
      category: "financial",
      customer: "Sarah Brown",
      customerId: "CUST-2023-006",
      loanId: "LOAN-2023-006",
      uploadDate: "2023-09-12",
      status: "rejected",
      size: "2.1 MB",
      type: "PDF",
    },
    {
      id: "DOC-2023-007",
      name: "Business Plan - David Miller",
      category: "business",
      customer: "David Miller",
      customerId: "CUST-2023-007",
      loanId: "LOAN-2023-007",
      uploadDate: "2023-09-12",
      status: "verified",
      size: "4.5 MB",
      type: "PDF",
    },
    {
      id: "DOC-2023-008",
      name: "Employment Verification - Jennifer Taylor",
      category: "verification",
      customer: "Jennifer Taylor",
      customerId: "CUST-2023-008",
      loanId: "LOAN-2023-008",
      uploadDate: "2023-09-11",
      status: "pending",
      size: "0.7 MB",
      type: "PDF",
    },
  ]

  // Filter documents based on category
  const filteredDocuments = documents.filter((doc) => {
    if (categoryFilter === "all") return true
    return doc.category === categoryFilter
  })

  // Status badge styling
  const statusConfig = {
    verified: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4 text-yellow-500 mr-1" /> },
    rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4 text-red-500 mr-1" /> },
  }

  // Category badge styling
  const categoryConfig = {
    agreement: { color: "bg-blue-100 text-blue-800" },
    verification: { color: "bg-purple-100 text-purple-800" },
    credit: { color: "bg-green-100 text-green-800" },
    appraisal: { color: "bg-yellow-100 text-yellow-800" },
    financial: { color: "bg-indigo-100 text-indigo-800" },
    business: { color: "bg-orange-100 text-orange-800" },
  }

  // Handle checkbox selection
  const toggleSelection = (id: string) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((docId) => docId !== id))
    } else {
      setSelectedDocuments([...selectedDocuments, id])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id))
    }
  }

  // Document metrics
  const documentMetrics = {
    totalDocuments: 125,
    pendingVerification: 28,
    verifiedDocuments: 92,
    rejectedDocuments: 5,
  }

  return (
    <AdminLayout title="Document Management">
      <div className="space-y-6">
        {/* Document Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Documents</p>
                  <p className="text-2xl font-bold">{documentMetrics.totalDocuments}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>All document types</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-yellow-700">Pending Verification</p>
                  <p className="text-2xl font-bold text-yellow-800">{documentMetrics.pendingVerification}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-yellow-700">
                <span>Requires review</span>
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
                  <p className="text-sm text-green-700">Verified Documents</p>
                  <p className="text-2xl font-bold text-green-800">{documentMetrics.verifiedDocuments}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-green-700">
                <span>73.6% of all documents</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-red-700">Rejected Documents</p>
                  <p className="text-2xl font-bold text-red-800">{documentMetrics.rejectedDocuments}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-red-700">
                <span>Requires follow-up</span>
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
              <FilePlus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button variant="outline" disabled={selectedDocuments.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Download Selected
            </Button>
            <Button variant="outline" disabled={selectedDocuments.length === 0}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Selected
            </Button>
            <Button
              variant="outline"
              className="text-red-500 hover:text-red-600"
              disabled={selectedDocuments.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="text" placeholder="Search documents" className="pl-10 pr-4 w-64" />
            </div>
            <Select defaultValue="all" onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="agreement">Loan Agreements</SelectItem>
                <SelectItem value="verification">Verification</SelectItem>
                <SelectItem value="credit">Credit Reports</SelectItem>
                <SelectItem value="appraisal">Appraisals</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>
                  {categoryFilter === "all"
                    ? "All documents"
                    : `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} documents`}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
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
                        checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Document
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Upload Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedDocuments.includes(document.id)}
                          onCheckedChange={() => toggleSelection(document.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{document.name}</div>
                            <div className="text-xs text-gray-500">
                              {document.id} • {document.type}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryConfig[document.category as keyof typeof categoryConfig].color}>
                          {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{document.customer}</div>
                          <div className="text-xs text-gray-500">Loan #{document.loanId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell>
                        <Badge className={statusConfig[document.status as keyof typeof statusConfig].color}>
                          <div className="flex items-center">
                            {statusConfig[document.status as keyof typeof statusConfig].icon}
                            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
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
              Showing {filteredDocuments.length} of {documents.length} documents
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

        {/* Document Alerts */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
              Document Alerts
            </CardTitle>
            <CardDescription>Important notifications about document status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Documents Awaiting Verification</div>
                  <div className="text-xs text-gray-700 mt-1">
                    28 documents have been pending verification for more than 48 hours. Please prioritize these for
                    review.
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Pending Documents
                  </Button>
                </div>
              </div>

              <div className="flex items-start p-3 border bg-white rounded-lg">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Expired Documents</div>
                  <div className="text-xs text-gray-700 mt-1">
                    5 verification documents are expired or will expire within the next 30 days. These require customer
                    follow-up.
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Expired Documents
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

