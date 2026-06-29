"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, ChartContainer } from "@/components/ui/charts"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Printer,
  Share2,
  Filter,
  ArrowUpDown,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminReports() {
  const [timeRange, setTimeRange] = useState("month")
  const [reportType, setReportType] = useState("performance")

  // Sample data for loan performance chart
  const loanPerformanceData = [
    { name: "Jan", applications: 45, approvals: 32, rejections: 13 },
    { name: "Feb", applications: 52, approvals: 38, rejections: 14 },
    { name: "Mar", applications: 48, approvals: 35, rejections: 13 },
    { name: "Apr", applications: 55, approvals: 42, rejections: 13 },
    { name: "May", applications: 62, approvals: 48, rejections: 14 },
    { name: "Jun", applications: 58, approvals: 45, rejections: 13 },
    { name: "Jul", applications: 65, approvals: 52, rejections: 13 },
    { name: "Aug", applications: 72, approvals: 58, rejections: 14 },
    { name: "Sep", applications: 68, approvals: 54, rejections: 14 },
  ]

  // Sample data for loan distribution chart
  const loanDistributionData = [
    { name: "Personal", value: 850000 },
    { name: "Business", value: 1200000 },
    { name: "Mortgage", value: 3500000 },
    { name: "Auto", value: 650000 },
    { name: "Education", value: 450000 },
  ]

  // Sample data for credit score distribution
  const creditScoreData = [
    { name: "300-579", value: 45 },
    { name: "580-669", value: 85 },
    { name: "670-739", value: 120 },
    { name: "740-799", value: 95 },
    { name: "800-850", value: 55 },
  ]

  // Sample data for default rate trend
  const defaultRateTrendData = [
    { name: "Jan", value: 2.8 },
    { name: "Feb", value: 2.7 },
    { name: "Mar", value: 2.9 },
    { name: "Apr", value: 2.6 },
    { name: "May", value: 2.5 },
    { name: "Jun", value: 2.4 },
    { name: "Jul", value: 2.3 },
    { name: "Aug", value: 2.2 },
    { name: "Sep", value: 2.1 },
  ]

  // Report metrics
  const reportMetrics = {
    totalLoanAmount: 6650000,
    amountTrend: 15,
    approvalRate: 78.5,
    approvalTrend: 2.3,
    averageInterestRate: 5.4,
    rateTrend: -0.2,
    defaultRate: 2.1,
    defaultTrend: -0.3,
  }

  return (
    <AdminLayout title="Financial Reports">
      <div className="space-y-6">
        {/* Report Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Financial Reports</h1>
            <p className="text-gray-500">Analyze loan performance and financial metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="month" onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
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
                  <p className="text-sm text-gray-500">Total Loan Amount</p>
                  <p className="text-2xl font-bold">${(reportMetrics.totalLoanAmount / 1000000).toFixed(2)}M</p>
                </div>
                <div
                  className={`flex items-center text-sm ${reportMetrics.amountTrend > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {reportMetrics.amountTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(reportMetrics.amountTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Approval Rate</p>
                  <p className="text-2xl font-bold">{reportMetrics.approvalRate}%</p>
                </div>
                <div
                  className={`flex items-center text-sm ${reportMetrics.approvalTrend > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {reportMetrics.approvalTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(reportMetrics.approvalTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Average Interest Rate</p>
                  <p className="text-2xl font-bold">{reportMetrics.averageInterestRate}%</p>
                </div>
                <div
                  className={`flex items-center text-sm ${reportMetrics.rateTrend < 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {reportMetrics.rateTrend < 0 ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(reportMetrics.rateTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Default Rate</p>
                  <p className="text-2xl font-bold">{reportMetrics.defaultRate}%</p>
                </div>
                <div
                  className={`flex items-center text-sm ${reportMetrics.defaultTrend < 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {reportMetrics.defaultTrend < 0 ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(reportMetrics.defaultTrend)}%
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Since last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="performance" onValueChange={setReportType}>
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Loan Performance</TabsTrigger>
            <TabsTrigger value="distribution">Loan Distribution</TabsTrigger>
            <TabsTrigger value="credit">Credit Score Analysis</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Loan Performance</CardTitle>
                    <CardDescription>Monthly application, approval, and rejection trends</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <BarChart
                      data={loanPerformanceData}
                      categories={["applications", "approvals", "rejections"]}
                      colors={["#3b82f6", "#10b981", "#ef4444"]}
                      valueFormatter={(value) => `${value}`}
                      showLegend={true}
                      showXAxis={true}
                      showYAxis={true}
                    />
                  </ChartContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500">Total Applications</div>
                    <div className="text-2xl font-bold">525</div>
                    <div className="text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12% from previous period
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500">Approval Rate</div>
                    <div className="text-2xl font-bold">78.5%</div>
                    <div className="text-sm text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2.3% from previous period
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500">Average Processing Time</div>
                    <div className="text-2xl font-bold">3.2 days</div>
                    <div className="text-sm text-green-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -0.5 days from previous period
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Detailed Performance Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Loan Distribution</CardTitle>
                    <CardDescription>Total loan amount by type</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
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

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-4">Loan Type Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>Mortgage</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">$3,500,000</span>
                        <span className="text-gray-500">(52.6%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Business</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">$1,200,000</span>
                        <span className="text-gray-500">(18.0%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span>Personal</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">$850,000</span>
                        <span className="text-gray-500">(12.8%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span>Auto</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">$650,000</span>
                        <span className="text-gray-500">(9.8%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span>Education</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">$450,000</span>
                        <span className="text-gray-500">(6.8%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credit">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Credit Score Analysis</CardTitle>
                    <CardDescription>Distribution of customer credit scores</CardDescription>
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
                <div className="h-[400px]">
                  <ChartContainer>
                    <BarChart
                      data={creditScoreData}
                      categories={["value"]}
                      colors={["#10b981"]}
                      valueFormatter={(value) => `${value} customers`}
                      showLegend={false}
                      showXAxis={true}
                      showYAxis={true}
                    />
                  </ChartContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                  <div className="border rounded-lg p-4 bg-red-50">
                    <div className="text-sm text-gray-700">Poor</div>
                    <div className="text-lg font-bold">45</div>
                    <div className="text-xs text-gray-500">300-579</div>
                  </div>
                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <div className="text-sm text-gray-700">Fair</div>
                    <div className="text-lg font-bold">85</div>
                    <div className="text-xs text-gray-500">580-669</div>
                  </div>
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="text-sm text-gray-700">Good</div>
                    <div className="text-lg font-bold">120</div>
                    <div className="text-xs text-gray-500">670-739</div>
                  </div>
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="text-sm text-gray-700">Very Good</div>
                    <div className="text-lg font-bold">95</div>
                    <div className="text-xs text-gray-500">740-799</div>
                  </div>
                  <div className="border rounded-lg p-4 bg-emerald-50">
                    <div className="text-sm text-gray-700">Excellent</div>
                    <div className="text-lg font-bold">55</div>
                    <div className="text-xs text-gray-500">800-850</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Default rate trends and risk analysis</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <LineChart
                      data={defaultRateTrendData}
                      categories={["value"]}
                      colors={["#ef4444"]}
                      valueFormatter={(value) => `${value}%`}
                      showLegend={false}
                      showXAxis={true}
                      showYAxis={true}
                    />
                  </ChartContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500">Current Default Rate</div>
                    <div className="text-2xl font-bold">2.1%</div>
                    <div className="text-sm text-green-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -0.3% from previous period
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500">At-Risk Loans</div>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm text-gray-500">4.2% of active loans</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500">Average Days Delinquent</div>
                    <div className="text-2xl font-bold">12.5</div>
                    <div className="text-sm text-red-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +1.2 days from previous period
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Detailed Risk Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

