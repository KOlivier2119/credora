"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Bell, FileText } from "lucide-react"
import Layout from "@/components/layout"

export default function LoanTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Sample loan applications data
  const applications = [
    {
      id: "LOAN-APP-2023-001",
      amount: 15000,
      purpose: "Home Improvement",
      status: "approved",
      submittedDate: "2023-11-15",
      approvalDate: "2023-11-22",
      disbursementDate: "2023-11-29",
      progress: 100,
      timeToDisburse: "2 days",
      notes: "Your loan has been approved and funds will be disbursed within 2 business days.",
      nextSteps:
        "Check your bank account for the deposit. You'll receive a confirmation email once funds are disbursed.",
    },
    {
      id: "LOAN-APP-2023-002",
      amount: 25000,
      purpose: "Business",
      status: "processing",
      submittedDate: "2023-12-01",
      approvalDate: null,
      disbursementDate: null,
      progress: 60,
      timeToDisburse: "5-7 days (estimated)",
      notes: "Your application is being reviewed by our underwriting team. We'll notify you of any updates.",
      nextSteps: "Our team may contact you for additional documentation. Please check your email regularly.",
    },
    {
      id: "LOAN-APP-2023-003",
      amount: 5000,
      purpose: "Medical Expenses",
      status: "rejected",
      submittedDate: "2023-11-10",
      approvalDate: null,
      disbursementDate: null,
      progress: 100,
      timeToDisburse: "N/A",
      notes: "We regret to inform you that your loan application was not approved at this time.",
      rejectionReason: "Debt-to-income ratio exceeds our current lending criteria.",
      nextSteps: "You can apply again after 30 days. Consider reducing existing debt to improve your chances.",
    },
    {
      id: "LOAN-APP-2023-004",
      amount: 10000,
      purpose: "Debt Consolidation",
      status: "pending",
      submittedDate: "2023-12-05",
      approvalDate: null,
      disbursementDate: null,
      progress: 30,
      timeToDisburse: "7-10 days (estimated)",
      notes: "Your application has been received and is pending initial review. We'll begin processing shortly.",
      nextSteps: "No action needed at this time. We'll notify you once your application moves to the next stage.",
    },
  ]

  // Filter applications based on active tab and search query
  const filteredApplications = applications
    .filter((app) => {
      if (activeTab === "all") return true
      return app.status === activeTab
    })
    .filter((app) => {
      if (!searchQuery) return true
      return (
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.purpose.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  // Status badge styling
  const statusConfig = {
    approved: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> },
    processing: { color: "bg-blue-100 text-blue-800", icon: <Clock className="h-4 w-4 text-blue-500 mr-1" /> },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" /> },
    rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4 text-red-500 mr-1" /> },
  }

  return (
    <Layout title="Loan Tracker">
      <div className="space-y-6">
        {/* Header with search */}
        <Card className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Loan Application Tracker</h2>
                <p className="mt-1 text-blue-100">Track the status of your loan applications in real-time</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-white text-[#0a1525] hover:bg-blue-100">
                  <FileText className="h-4 w-4 mr-2" />
                  New Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by ID or purpose"
              className="pl-10 pr-4 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Applications list */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No applications found</h3>
                <p className="text-gray-500 mt-1">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "You don't have any loan applications with this status"}
                </p>
                <Button className="mt-4 bg-[#0a1525] hover:bg-[#1a2b45]">Apply for a Loan</Button>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <div
                  className={`h-1 ${
                    application.status === "approved"
                      ? "bg-green-500"
                      : application.status === "rejected"
                        ? "bg-red-500"
                        : application.status === "processing"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                  }`}
                ></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        {application.purpose} Loan
                        <Badge
                          className={`ml-3 ${statusConfig[application.status as keyof typeof statusConfig].color}`}
                        >
                          <div className="flex items-center">
                            {statusConfig[application.status as keyof typeof statusConfig].icon}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </div>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Application ID: {application.id} | ${application.amount.toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                      </div>
                      {application.status === "approved" && application.approvalDate && (
                        <div className="text-sm text-green-600">
                          Approved: {new Date(application.approvalDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress tracker */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Application Progress</span>
                        <span className="text-sm">{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="h-2" />
                    </div>

                    {/* Application stages */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            application.progress >= 25 ? "bg-green-500 text-white" : "bg-gray-200"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Submitted</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            application.progress >= 50 ? "bg-green-500 text-white" : "bg-gray-200"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Under Review</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            application.progress >= 75 ? "bg-green-500 text-white" : "bg-gray-200"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Decision</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            application.progress === 100 && application.status === "approved"
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Funding</span>
                      </div>
                    </div>

                    {/* Status specific information */}
                    {application.status === "approved" && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-sm">Congratulations! Your loan is approved.</h4>
                            <p className="text-sm text-gray-600 mt-1">{application.notes}</p>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Next Steps: </span>
                              <span className="text-sm text-gray-600">{application.nextSteps}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {application.status === "processing" && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-sm">Your application is being processed</h4>
                            <p className="text-sm text-gray-600 mt-1">{application.notes}</p>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Next Steps: </span>
                              <span className="text-sm text-gray-600">{application.nextSteps}</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Estimated Time to Decision: </span>
                              <span className="text-sm text-gray-600">3-5 business days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {application.status === "pending" && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-sm">Your application is pending review</h4>
                            <p className="text-sm text-gray-600 mt-1">{application.notes}</p>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Next Steps: </span>
                              <span className="text-sm text-gray-600">{application.nextSteps}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {application.status === "rejected" && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <div className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-sm">Your application was not approved</h4>
                            <p className="text-sm text-gray-600 mt-1">{application.notes}</p>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Reason: </span>
                              <span className="text-sm text-gray-600">{application.rejectionReason}</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm font-medium">Next Steps: </span>
                              <span className="text-sm text-gray-600">{application.nextSteps}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-2 mt-4">
                      {application.status === "approved" && (
                        <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">
                          View Loan Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                      {(application.status === "pending" || application.status === "processing") && (
                        <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">
                          Track Updates
                          <Bell className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                      {application.status === "rejected" && (
                        <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Apply Again</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Help section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Need Help?</CardTitle>
            <CardDescription>Questions about your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Application Taking Too Long?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Most applications are processed within 3-5 business days. If it's been longer, please contact our
                    support team.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Application Rejected?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    We're happy to review your application with you and suggest ways to improve your chances next time.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

