"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, ChartContainer } from "@/components/ui/charts"
import { Calendar, CheckCircle, Clock, DollarSign, FileText, AlertCircle, Download, CreditCard } from "lucide-react"
import Layout from "@/components/layout"

export default function ManageLoans() {
  const [activeTab, setActiveTab] = useState("active")

  // Sample data for active loans
  const loans = [
    {
      id: "LOAN-2023-001",
      amount: 15000,
      purpose: "Home Improvement",
      status: "active",
      startDate: "2023-01-15",
      term: 36,
      interestRate: 5.2,
      remainingAmount: 12500,
      nextPayment: {
        amount: 450,
        date: "2023-12-15",
      },
      progress: 17, // 17% paid off
      paymentHistory: [
        { month: "Jan", amount: 450 },
        { month: "Feb", amount: 450 },
        { month: "Mar", amount: 450 },
        { month: "Apr", amount: 450 },
        { month: "May", amount: 450 },
        { month: "Jun", amount: 450 },
        { month: "Jul", amount: 450 },
        { month: "Aug", amount: 450 },
        { month: "Sep", amount: 450 },
        { month: "Oct", amount: 450 },
        { month: "Nov", amount: 450 },
      ],
    },
    {
      id: "LOAN-2023-002",
      amount: 8000,
      purpose: "Debt Consolidation",
      status: "active",
      startDate: "2023-03-10",
      term: 24,
      interestRate: 4.8,
      remainingAmount: 5200,
      nextPayment: {
        amount: 350,
        date: "2023-12-10",
      },
      progress: 35, // 35% paid off
      paymentHistory: [
        { month: "Mar", amount: 350 },
        { month: "Apr", amount: 350 },
        { month: "May", amount: 350 },
        { month: "Jun", amount: 350 },
        { month: "Jul", amount: 350 },
        { month: "Aug", amount: 350 },
        { month: "Sep", amount: 350 },
        { month: "Oct", amount: 350 },
        { month: "Nov", amount: 350 },
      ],
    },
  ]

  // Sample data for completed loans
  const completedLoans = [
    {
      id: "LOAN-2022-045",
      amount: 12000,
      purpose: "Education",
      status: "completed",
      startDate: "2022-05-20",
      endDate: "2023-05-20",
      term: 12,
      interestRate: 4.5,
      totalPaid: 12540,
    },
  ]

  // Upcoming payments
  const upcomingPayments = [
    {
      loanId: "LOAN-2023-001",
      purpose: "Home Improvement",
      amount: 450,
      date: "2023-12-15",
      status: "upcoming",
    },
    {
      loanId: "LOAN-2023-002",
      purpose: "Debt Consolidation",
      amount: 350,
      date: "2023-12-10",
      status: "upcoming",
    },
    {
      loanId: "LOAN-2023-001",
      purpose: "Home Improvement",
      amount: 450,
      date: "2024-01-15",
      status: "scheduled",
    },
  ]

  // Filter loans based on active tab
  const filteredLoans = activeTab === "active" ? loans : completedLoans

  return (
    <Layout title="My Loans">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">My Loans</h2>
                <p className="mt-1 text-blue-100">Manage your active loans and payment schedule</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-white text-[#0a1525] hover:bg-blue-100">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Apply for a New Loan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Active Loans</span>
                <span className="text-2xl font-bold">{loans.length}</span>
                <div className="flex items-center mt-2 text-sm text-blue-500">
                  <span>
                    ${loans.reduce((sum, loan) => sum + loan.remainingAmount, 0).toLocaleString()} outstanding
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Next Payment Due</span>
                <span className="text-2xl font-bold">
                  {upcomingPayments.length > 0
                    ? new Date(upcomingPayments[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "No payments due"}
                </span>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <span>${upcomingPayments.length > 0 ? upcomingPayments[0].amount : 0} payment amount</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Interest Paid</span>
                <span className="text-2xl font-bold">$1,240</span>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>Year to date</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Management Section */}
        <Tabs defaultValue="active" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Loans</TabsTrigger>
            <TabsTrigger value="completed">Completed Loans</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredLoans.length === 0 ? (
              <Card>
                <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No {activeTab} loans</h3>
                  <p className="text-gray-500 mt-1 mb-4">You don't have any {activeTab} loans at the moment</p>
                  <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Apply for a Loan</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {loans.map((loan) => (
                  <Card key={loan.id} className="overflow-hidden">
                    <div className="h-1 bg-blue-500"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {loan.purpose} Loan
                            <Badge className="ml-3 bg-green-100 text-green-800">
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                Active
                              </div>
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Loan ID: {loan.id} | Started: {new Date(loan.startDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${loan.remainingAmount.toLocaleString()}{" "}
                            <span className="text-sm text-gray-500">remaining</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            of ${loan.amount.toLocaleString()} original amount
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Repayment Progress */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Repayment Progress</span>
                            <span className="text-sm">{loan.progress}%</span>
                          </div>
                          <Progress value={loan.progress} className="h-2" />
                        </div>

                        {/* Loan Details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Next Payment</div>
                            <div className="text-lg font-semibold">${loan.nextPayment.amount}</div>
                            <div className="text-xs text-blue-500">
                              Due {new Date(loan.nextPayment.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Interest Rate</div>
                            <div className="text-lg font-semibold">{loan.interestRate}%</div>
                            <div className="text-xs text-gray-500">Fixed rate</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Term Length</div>
                            <div className="text-lg font-semibold">{loan.term} months</div>
                            <div className="text-xs text-gray-500">{Math.round((loan.term / 12) * 10) / 10} years</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Remaining Payments</div>
                            <div className="text-lg font-semibold">
                              {Math.ceil(
                                (loan.term * loan.amount - (loan.amount - loan.remainingAmount) * loan.term) /
                                  loan.amount,
                              )}
                            </div>
                            <div className="text-xs text-gray-500">of {loan.term} total</div>
                          </div>
                        </div>

                        {/* Payment History Chart */}
                        <div className="mt-4">
                          <h4 className="font-medium text-sm mb-2">Payment History</h4>
                          <div className="h-[150px]">
                            <ChartContainer>
                              <LineChart
                                data={loan.paymentHistory.map((payment) => ({
                                  name: payment.month,
                                  value: payment.amount,
                                }))}
                                categories={["value"]}
                                colors={["#3b82f6"]}
                                valueFormatter={(value) => `$${value}`}
                                showLegend={false}
                                showXAxis
                                showYAxis
                              />
                            </ChartContainer>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" className="text-sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Payment Schedule
                          </Button>
                          <Button className="bg-[#0a1525] hover:bg-[#1a2b45] text-sm">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Make a Payment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedLoans.length === 0 ? (
              <Card>
                <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No completed loans</h3>
                  <p className="text-gray-500 mt-1">You don't have any completed loans yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {completedLoans.map((loan) => (
                  <Card key={loan.id} className="overflow-hidden">
                    <div className="h-1 bg-green-500"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {loan.purpose} Loan
                            <Badge className="ml-3 bg-blue-100 text-blue-800">
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-blue-500 mr-1" />
                                Completed
                              </div>
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Loan ID: {loan.id} | Completed: {new Date(loan.endDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${loan.amount.toLocaleString()} <span className="text-sm text-gray-500">loan amount</span>
                          </div>
                          <div className="text-sm text-gray-500">${loan.totalPaid.toLocaleString()} total paid</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Loan Details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Loan Term</div>
                            <div className="text-lg font-semibold">{loan.term} months</div>
                            <div className="text-xs text-gray-500">{Math.round((loan.term / 12) * 10) / 10} years</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Interest Rate</div>
                            <div className="text-lg font-semibold">{loan.interestRate}%</div>
                            <div className="text-xs text-gray-500">Fixed rate</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Total Interest Paid</div>
                            <div className="text-lg font-semibold">
                              ${(loan.totalPaid - loan.amount).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round(((loan.totalPaid - loan.amount) / loan.amount) * 100)}% of principal
                            </div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Status</div>
                            <div className="text-lg font-semibold text-green-600">Paid in Full</div>
                            <div className="text-xs text-gray-500">Completed on time</div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" className="text-sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Statement
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Upcoming Payments Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Your scheduled loan payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">No upcoming payments scheduled</p>
                </div>
              ) : (
                upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{payment.purpose} Loan</div>
                        <div className="text-sm text-gray-500">Loan #{payment.loanId}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">${payment.amount}</div>
                      <div className="text-sm text-gray-500">Due {new Date(payment.date).toLocaleDateString()}</div>
                    </div>
                    <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Pay Now</Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Payment Calendar
            </Button>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Set Up Auto-Pay
            </Button>
          </CardFooter>
        </Card>

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Need Help With Your Loan?</CardTitle>
            <CardDescription>We're here to assist you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Having trouble making a payment?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    We offer flexible payment options and hardship programs. Contact us before missing a payment.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Want to pay off your loan early?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    There are no prepayment penalties. You can make extra payments or pay off your loan at any time.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                Contact Loan Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

