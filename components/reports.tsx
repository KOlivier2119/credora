"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, ChartContainer } from "@/components/ui/charts"
import { Download, TrendingUp, DollarSign, Share2, FileText, Printer, HelpCircle, AlertCircle } from "lucide-react"
import Layout from "@/components/layout"

export default function Reports() {
  const [timeRange, setTimeRange] = useState("year")
  const [selectedLoan, setSelectedLoan] = useState("all")

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

  // Sample data for credit score history
  const creditScoreData = [
    { name: "Jan", value: 680 },
    { name: "Feb", value: 685 },
    { name: "Mar", value: 690 },
    { name: "Apr", value: 695 },
    { name: "May", value: 700 },
    { name: "Jun", value: 705 },
    { name: "Jul", value: 710 },
    { name: "Aug", value: 715 },
    { name: "Sep", value: 715 },
    { name: "Oct", value: 720 },
    { name: "Nov", value: 720 },
    { name: "Dec", value: 725 },
  ]

  // Sample data for loan distribution chart
  const loanDistributionData = [
    { name: "Home Improvement", active: 15000 },
    { name: "Debt Consolidation", active: 8000 },
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
    <Layout title="Financial Reports">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Financial Reports</h2>
                <p className="mt-1 text-blue-100">Track your financial health and loan performance</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button className="bg-white text-[#0a1525] hover:bg-blue-100">
                  <Download className="h-4 w-4 mr-2" />
                  Download Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Select defaultValue="all" onValueChange={setSelectedLoan}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select loan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Loans</SelectItem>
              <SelectItem value="loan-001">Home Improvement Loan</SelectItem>
              <SelectItem value="loan-002">Debt Consolidation Loan</SelectItem>
            </SelectContent>
          </Select>
          <Tabs defaultValue="year" onValueChange={setTimeRange} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="year">Year</TabsTrigger>
              <TabsTrigger value="6month">6 Months</TabsTrigger>
              <TabsTrigger value="3month">3 Months</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Credit Score Card */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Score History</CardTitle>
            <CardDescription>Track your credit score changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <LineChart
                  data={creditScoreData}
                  categories={["value"]}
                  colors={["#10b981"]}
                  valueFormatter={(value) => `${value}`}
                  showLegend={false}
                  showXAxis
                  showYAxis
                />
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500">Current Score</div>
                <div className="text-2xl font-bold">725</div>
                <div className="text-sm text-green-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +45 points this year
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500">Credit Rating</div>
                <div className="text-2xl font-bold text-green-600">Very Good</div>
                <div className="text-sm text-gray-500">Top 25% of consumers</div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500">Next Update</div>
                <div className="text-2xl font-bold">Jan 5, 2024</div>
                <div className="text-sm text-gray-500">Updated monthly</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">
              View Full Credit Report
            </Button>
          </CardFooter>
        </Card>

        {/* Report Tabs */}
        <Tabs defaultValue="payments">
          <TabsList className="mb-4">
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="loans">Loan Distribution</TabsTrigger>
            <TabsTrigger value="interest">Interest Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Track your loan payments over time</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <LineChart
                      data={paymentHistoryData}
                      categories={["value"]}
                      colors={["#3b82f6"]}
                      valueFormatter={(value: number) => `$${value}`}
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
                        <div className="text-sm text-gray-500">Home Improvement Loan</div>
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
                        <div className="font-medium">November 2023 Payment</div>
                        <div className="text-sm text-gray-500">Debt Consolidation Loan</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">$350</div>
                      <div className="text-sm text-gray-500">Principal: $310 | Interest: $40</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Nov 10, 2023</div>
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

          <TabsContent value="loans">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Loan Distribution</CardTitle>
                    <CardDescription>Breakdown of your current loans</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
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
                          <span className="text-gray-500">(65%)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Debt Consolidation</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">$8,000</span>
                          <span className="text-gray-500">(35%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-4">Loan Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Total Loan Amount:</span>
                        <span className="font-medium">$23,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Total Monthly Payment:</span>
                        <span className="font-medium">$800</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Average Interest Rate:</span>
                        <span className="font-medium">5.0%</span>
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
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
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
                      <div className="text-2xl font-bold">4.8%</div>
                      <div className="text-sm text-gray-500 mt-1">Debt Consolidation Loan</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Highest Rate</div>
                      <div className="text-2xl font-bold">5.2%</div>
                      <div className="text-sm text-gray-500 mt-1">Home Improvement Loan</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Financial Health Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
              Financial Health Tips
            </CardTitle>
            <CardDescription>Personalized recommendations based on your financial profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Improve Your Debt-to-Income Ratio</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your current debt-to-income ratio is 32%. Reducing this to below 30% could improve your credit score
                    and qualify you for better rates.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <AlertCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Consider Refinancing</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    With your improved credit score, you may qualify for a lower interest rate. Refinancing could save
                    you approximately $25 per month.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <DollarSign className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Set Up Automatic Payments</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Automatic payments ensure you never miss a due date, which is crucial for maintaining your credit
                    score. Some lenders also offer a small interest rate discount.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="w-full bg-[#0a1525] hover:bg-[#1a2b45]">Get Personalized Financial Plan</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

