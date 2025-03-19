"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, ChartContainer } from "@/components/ui/charts"
import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  ChevronRight,
  Bell,
  Lightbulb,
} from "lucide-react"
import Layout from "@/components/layout"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // User profile data
  const userProfile = {
    name: "John Doe",
    creditScore: 720,
    creditScoreChange: +15,
    lastUpdated: "Dec 5, 2023",
    nextUpdate: "Jan 5, 2024",
    eligibilityScore: 85,
    recommendedLoanAmount: 25000,
    maxLoanAmount: 35000,
  }

  // Credit score history data
  const creditScoreHistory = [
    { name: "Jul", value: 680 },
    { name: "Aug", value: 685 },
    { name: "Sep", value: 695 },
    { name: "Oct", value: 705 },
    { name: "Nov", value: 710 },
    { name: "Dec", value: 720 },
  ]

  // Recent applications
  const recentApplications = [
    {
      id: "LOAN-APP-2023-001",
      amount: 15000,
      purpose: "Home Improvement",
      status: "approved",
      date: "Nov 22, 2023",
      disbursementDate: "Nov 29, 2023",
    },
    {
      id: "LOAN-APP-2023-002",
      amount: 25000,
      purpose: "Business",
      status: "processing",
      date: "Dec 1, 2023",
      progress: 60,
    },
  ]

  // Active loans
  const activeLoans = [
    {
      id: "LOAN-2023-001",
      amount: 15000,
      purpose: "Home Improvement",
      remainingBalance: 12500,
      nextPayment: {
        amount: 450,
        date: "Dec 15, 2023",
      },
      progress: 17, // 17% paid off
    },
  ]

  // Upcoming payments
  const upcomingPayments = [
    {
      loanId: "LOAN-2023-001",
      amount: 450,
      date: "Dec 15, 2023",
      status: "upcoming",
    },
    {
      loanId: "LOAN-2023-001",
      amount: 450,
      date: "Jan 15, 2024",
      status: "scheduled",
    },
  ]

  // Financial insights
  const financialInsights = [
    {
      title: "Pay off your credit card debt",
      description: "Reducing your credit card balance by $2,000 could improve your credit score by up to 20 points.",
      impact: "high",
    },
    {
      title: "Avoid new credit inquiries",
      description: "Multiple credit inquiries in a short period can temporarily lower your score.",
      impact: "medium",
    },
    {
      title: "Consider debt consolidation",
      description: "Consolidating your high-interest debts could save you $350 per month.",
      impact: "high",
    },
  ]

  // Recommended loans based on profile
  const recommendedLoans = [
    {
      type: "Personal Loan",
      amount: 20000,
      term: 36,
      interestRate: 8.5,
      monthlyPayment: 630,
      eligibility: 95,
    },
    {
      type: "Home Improvement",
      amount: 25000,
      term: 60,
      interestRate: 7.2,
      monthlyPayment: 498,
      eligibility: 90,
    },
    {
      type: "Debt Consolidation",
      amount: 15000,
      term: 48,
      interestRate: 6.9,
      monthlyPayment: 356,
      eligibility: 98,
    },
  ]

  // Credit score rating function
  const getCreditScoreRating = (score: number) => {
    if (score >= 800) return { label: "Excellent", color: "text-green-600" }
    if (score >= 740) return { label: "Very Good", color: "text-green-500" }
    if (score >= 670) return { label: "Good", color: "text-blue-500" }
    if (score >= 580) return { label: "Fair", color: "text-yellow-500" }
    return { label: "Poor", color: "text-red-500" }
  }

  const creditRating = getCreditScoreRating(userProfile.creditScore)

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, {userProfile.name}</h2>
                <p className="mt-1 text-blue-100">Here's your financial overview and loan status</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button className="bg-white text-[#0a1525] hover:bg-blue-100">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Apply for a Loan
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="loans">Active Loans</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Credit Score Card */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Credit Score</span>
                    <Badge variant="outline" className="font-normal">
                      Last updated: {userProfile.lastUpdated}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Your credit score affects your loan eligibility and rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col items-center mb-4 md:mb-0">
                      <div className="relative">
                        <svg className="w-36 h-36">
                          <circle cx="72" cy="72" r="60" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            fill="none"
                            stroke={
                              userProfile.creditScore >= 740
                                ? "#10b981"
                                : userProfile.creditScore >= 670
                                  ? "#3b82f6"
                                  : userProfile.creditScore >= 580
                                    ? "#f59e0b"
                                    : "#ef4444"
                            }
                            strokeWidth="12"
                            strokeDasharray="377"
                            strokeDashoffset={377 - 377 * (userProfile.creditScore / 850)}
                            transform="rotate(-90 72 72)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{userProfile.creditScore}</span>
                          <span className={`text-sm font-medium ${creditRating.color}`}>{creditRating.label}</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <span
                          className={`text-sm ${userProfile.creditScoreChange > 0 ? "text-green-500" : "text-red-500"} flex items-center`}
                        >
                          {userProfile.creditScoreChange > 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {userProfile.creditScoreChange > 0 ? "+" : ""}
                          {userProfile.creditScoreChange} pts
                        </span>
                        <span className="text-xs text-gray-500 ml-2">since last month</span>
                      </div>
                    </div>

                    <div className="h-[150px] w-full md:w-2/3">
                      <ChartContainer>
                        <LineChart
                          data={creditScoreHistory}
                          categories={["value"]}
                          colors={["#3b82f6"]}
                          valueFormatter={(value) => `${value}`}
                          showLegend={false}
                          showXAxis
                          showYAxis
                        />
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="border rounded-lg p-3">
                      <div className="text-sm text-gray-500">Credit Utilization</div>
                      <div className="text-lg font-semibold">28%</div>
                      <div className="text-xs text-green-500">Good (under 30%)</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-sm text-gray-500">Payment History</div>
                      <div className="text-lg font-semibold">98%</div>
                      <div className="text-xs text-green-500">Excellent</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-sm text-gray-500">Account Age</div>
                      <div className="text-lg font-semibold">5.2 years</div>
                      <div className="text-xs text-blue-500">Good</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    View Full Credit Report
                  </Button>
                </CardFooter>
              </Card>

              {/* Loan Eligibility Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Loan Eligibility</CardTitle>
                  <CardDescription>Based on your credit profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Eligibility</span>
                        <span className="text-sm font-medium">{userProfile.eligibilityScore}%</span>
                      </div>
                      <Progress value={userProfile.eligibilityScore} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        Your credit score and financial history qualify you for most loan products
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Recommended Loan Amount</h4>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <span className="text-2xl font-bold">
                          ${userProfile.recommendedLoanAmount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Based on your income and credit profile</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Maximum Loan Amount</h4>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-blue-500" />
                        <span className="text-2xl font-bold">${userProfile.maxLoanAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Maximum amount you may qualify for</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-[#0a1525] hover:bg-[#1a2b45]">Check Loan Options</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Recent Activity & Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Recent Activity */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Your latest loan applications and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              app.status === "approved" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {app.status === "approved" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">{app.purpose} Loan</div>
                            <div className="text-sm text-gray-500">${app.amount.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Badge
                              className={`${
                                app.status === "approved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{app.date}</div>
                        </div>
                      </div>
                    ))}

                    {upcomingPayments.length > 0 && (
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">Upcoming Payment</div>
                            <div className="text-sm text-gray-500">Loan #{upcomingPayments[0].loanId}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${upcomingPayments[0].amount}</div>
                          <div className="text-sm text-gray-500">Due {upcomingPayments[0].date}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>

              {/* Financial Insights */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Financial Insights</CardTitle>
                  <CardDescription>Personalized recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialInsights.map((insight, index) => (
                      <div key={index} className="flex items-start p-3 border rounded-lg">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            insight.impact === "high" ? "bg-green-100" : "bg-blue-100"
                          }`}
                        >
                          <Lightbulb
                            className={`h-4 w-4 ${insight.impact === "high" ? "text-green-500" : "text-blue-500"}`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{insight.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{insight.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    View All Insights
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Loan Applications</CardTitle>
                <CardDescription>Track the status of your loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                {recentApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">No applications yet</h3>
                    <p className="text-gray-500 mt-1 mb-4">You haven't submitted any loan applications</p>
                    <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Apply for a Loan</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="border rounded-lg overflow-hidden">
                        <div className={`h-1 ${app.status === "approved" ? "bg-green-500" : "bg-blue-500"}`}></div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium flex items-center">
                                {app.purpose} Loan
                                <Badge
                                  className={`ml-3 ${
                                    app.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </Badge>
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">Application ID: {app.id}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${app.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">Submitted: {app.date}</div>
                            </div>
                          </div>

                          {app.status === "processing" && (
                            <div className="mt-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Application Progress</span>
                                <span className="text-sm">{app.progress}%</span>
                              </div>
                              <Progress value={app.progress} className="h-2" />
                              <p className="text-xs text-gray-500 mt-2">
                                Your application is being reviewed by our underwriting team
                              </p>
                            </div>
                          )}

                          {app.status === "approved" && (
                            <div className="mt-4 p-3 bg-green-50 rounded-lg">
                              <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-sm">Approved on {app.date}</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Your loan has been approved! Funds will be disbursed on {app.disbursementDate}.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end mt-4">
                            <Button variant="outline" className="text-sm">
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Loans Tab */}
          <TabsContent value="loans">
            <Card>
              <CardHeader>
                <CardTitle>Active Loans</CardTitle>
                <CardDescription>Manage your current loans and payments</CardDescription>
              </CardHeader>
              <CardContent>
                {activeLoans.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium">No active loans</h3>
                    <p className="text-gray-500 mt-1 mb-4">You don't have any active loans at the moment</p>
                    <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Apply for a Loan</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeLoans.map((loan) => (
                      <div key={loan.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{loan.purpose} Loan</h3>
                              <p className="text-sm text-gray-500 mt-1">Loan ID: {loan.id}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                ${loan.remainingBalance.toLocaleString()}{" "}
                                <span className="text-sm text-gray-500">remaining</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                of ${loan.amount.toLocaleString()} original amount
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Repayment Progress</span>
                              <span className="text-sm">{loan.progress}%</span>
                            </div>
                            <Progress value={loan.progress} className="h-2" />
                          </div>

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-gray-500">Next Payment</div>
                              <div className="text-lg font-semibold">${loan.nextPayment.amount}</div>
                              <div className="text-xs text-blue-500">Due {loan.nextPayment.date}</div>
                            </div>
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-gray-500">Payment Frequency</div>
                              <div className="text-lg font-semibold">Monthly</div>
                              <div className="text-xs text-gray-500">15th of each month</div>
                            </div>
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-gray-500">Interest Rate</div>
                              <div className="text-lg font-semibold">7.5%</div>
                              <div className="text-xs text-gray-500">Fixed rate</div>
                            </div>
                          </div>

                          <div className="flex justify-between mt-6">
                            <Button variant="outline" className="text-sm">
                              View Payment Schedule
                            </Button>
                            <Button className="bg-[#0a1525] hover:bg-[#1a2b45] text-sm">Make a Payment</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Payments Section */}
            {upcomingPayments.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Your scheduled loan payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">Payment for Loan #{payment.loanId}</div>
                            <div className="text-sm text-gray-500">
                              {payment.status === "upcoming" ? "Due soon" : "Scheduled"}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${payment.amount}</div>
                          <div className="text-sm text-gray-500">{payment.date}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Pay Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Loan Recommendations</CardTitle>
                <CardDescription>Based on your credit profile and financial history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendedLoans.map((loan, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{loan.type}</h3>
                            <div className="flex items-center mt-1">
                              <Badge className="bg-green-100 text-green-800">{loan.eligibility}% Match</Badge>
                              <span className="text-xs text-gray-500 ml-2">Based on your profile</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${loan.amount.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">
                              {loan.term} months at {loan.interestRate}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Monthly Payment</div>
                            <div className="text-lg font-semibold">${loan.monthlyPayment}</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Interest Rate</div>
                            <div className="text-lg font-semibold">{loan.interestRate}%</div>
                            <div className="text-xs text-gray-500">Fixed rate</div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <div className="text-sm text-gray-500">Term Length</div>
                            <div className="text-lg font-semibold">{loan.term} months</div>
                            <div className="text-xs text-gray-500">{loan.term / 12} years</div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4">
                          <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Credit Improvement Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Improve Your Credit Score</CardTitle>
                <CardDescription>Tips to increase your loan eligibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reduce Credit Utilization</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Try to keep your credit card balances below 30% of your credit limits. Reducing your utilization
                        from 50% to 30% could improve your score by 20-30 points.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Make Payments On Time</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Payment history accounts for 35% of your credit score. Set up automatic payments to ensure you
                        never miss a due date.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <AlertTriangle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Limit New Credit Applications</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Each application can temporarily lower your score by 5-10 points. Space out new credit
                        applications by at least 6 months.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Important Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 border rounded-lg bg-blue-50">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Upcoming Payment Reminder</div>
                  <div className="text-xs text-gray-700 mt-1">
                    Your next payment of $450 for Loan #LOAN-2023-001 is due on December 15, 2023.
                  </div>
                </div>
              </div>

              <div className="flex items-start p-3 border rounded-lg bg-green-50">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">Credit Score Update</div>
                  <div className="text-xs text-gray-700 mt-1">
                    Your credit score increased by 15 points this month. Keep up the good work!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

