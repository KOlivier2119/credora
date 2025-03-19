"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, ChartContainer } from "@/components/ui/charts"
import { Download, Filter, Calendar, TrendingUp, DollarSign, Share2, FileText, Printer } from "lucide-react"
import Layout from "@/components/layout"

export default function Reports() {
  const [timeRange, setTimeRange] = useState("year")

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

  // Sample data for loan distribution chart
  const loanDistributionData = [
    { name: "Home Improvement", active: 15000 },
    { name: "Debt Consolidation", active: 8000 },
    { name: "Business", active: 25000 },
    { name: "Education", active: 0 },
    { name: "Medical", active: 5000 },
  ]

  // Sample data for interest rates chart
  const interestRatesData = [
    { name: "Jan", value: 5.2 },
    { name: "Feb", value: 5.1 },
    { name: "Mar", value: 5.3 },
    { name: "Apr", value: 5.4 },
    { name: "May", value: 5.2 },
    { name: "Jun", value: 5.0 },
    { name: "Jul", value: 4.9 },
    { name: "Aug", value: 5.0 },
    { name: "Sep", value: 5.1 },
    { name: "Oct", value: 5.2 },
    { name: "Nov", value: 5.3 },
    { name: "Dec", value: 5.2 },
  ]

  return (
    <Layout title="Reports">
      <div className="space-y-6">
        {/* Report Controls */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            <p className="text-gray-500">View and analyze your loan data</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select loan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loans</SelectItem>
                <SelectItem value="loan-001">Loan #LOAN-2023-001</SelectItem>
                <SelectItem value="loan-002">Loan #LOAN-2023-002</SelectItem>
                <SelectItem value="loan-004">Loan #LOAN-2023-004</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Loan Amount</span>
                <span className="text-2xl font-bold">$53,000</span>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12% from last year</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Interest Paid</span>
                <span className="text-2xl font-bold">$2,850</span>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>Year to date</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Average Interest Rate</span>
                <span className="text-2xl font-bold">5.2%</span>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>-0.3% from last year</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Remaining Balance</span>
                <span className="text-2xl font-bold">$19,800</span>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <span>37% of total borrowed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="distribution">Loan Distribution</TabsTrigger>
            <TabsTrigger value="interest">Interest Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Monthly loan payments over time</CardDescription>
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
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Distribution</CardTitle>
                  <CardDescription>Breakdown of loans by purpose</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer>
                      <BarChart
                        data={loanDistributionData}
                        categories={["active"]}
                        colors={["#0a1525"]}
                        valueFormatter={(value) => `$${value.toLocaleString()}`}
                        showLegend={false}
                        showXAxis
                        showYAxis
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Detailed view of your loan payments</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tabs defaultValue="year" onValueChange={setTimeRange}>
                      <TabsList>
                        <TabsTrigger value="year">Year</TabsTrigger>
                        <TabsTrigger value="quarter">Quarter</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <LineChart
                      data={paymentHistoryData}
                      categories={["value"]}
                      colors={["#6366f1"]}
                      valueFormatter={(value) => `$${value}`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    />
                  </ChartContainer>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <DollarSign className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">November 2023 Payment</div>
                        <div className="text-sm text-gray-500">Loan #LOAN-2023-001</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">$450</div>
                      <div className="text-sm text-gray-500">Principal: $380 | Interest: $70</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Nov 15, 2023</div>
                      <div className="text-sm text-green-500">Paid on time</div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <DollarSign className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">October 2023 Payment</div>
                        <div className="text-sm text-gray-500">Loan #LOAN-2023-001</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">$450</div>
                      <div className="text-sm text-gray-500">Principal: $378 | Interest: $72</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Oct 15, 2023</div>
                      <div className="text-sm text-green-500">Paid on time</div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <DollarSign className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">September 2023 Payment</div>
                        <div className="text-sm text-gray-500">Loan #LOAN-2023-001</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">$450</div>
                      <div className="text-sm text-gray-500">Principal: $376 | Interest: $74</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Sep 15, 2023</div>
                      <div className="text-sm text-green-500">Paid on time</div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Loan Distribution</CardTitle>
                    <CardDescription>Breakdown of loans by purpose and status</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="outline">
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
                      categories={["active"]}
                      colors={["#0a1525"]}
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    />
                  </ChartContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-4">Loan Purpose Distribution</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span>Home Improvement</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$15,000</span>
                          <span className="text-gray-500">(28%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Debt Consolidation</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$8,000</span>
                          <span className="text-gray-500">(15%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span>Business</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$25,000</span>
                          <span className="text-gray-500">(47%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                          <span>Medical Expenses</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$5,000</span>
                          <span className="text-gray-500">(10%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-4">Loan Status Distribution</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Active Loans</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$28,000</span>
                          <span className="text-gray-500">(53%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                          <span>Pending Loans</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$25,000</span>
                          <span className="text-gray-500">(47%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span>Completed Loans</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$12,000</span>
                          <span className="text-gray-500">(0%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interest">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Interest Rate Trends</CardTitle>
                    <CardDescription>Historical interest rates on your loans</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer>
                    <LineChart
                      data={interestRatesData}
                      categories={["value"]}
                      colors={["#10b981"]}
                      valueFormatter={(value) => `${value}%`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    />
                  </ChartContainer>
                </div>

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-4">Interest Rate Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Current Average Rate</div>
                      <div className="text-2xl font-bold">5.2%</div>
                      <div className="text-sm text-green-500 mt-1">-0.3% from last year</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Lowest Rate</div>
                      <div className="text-2xl font-bold">4.2%</div>
                      <div className="text-sm text-gray-500 mt-1">Medical Expenses Loan</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Highest Rate</div>
                      <div className="text-2xl font-bold">6.1%</div>
                      <div className="text-sm text-gray-500 mt-1">Business Loan</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

