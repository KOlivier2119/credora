"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, ChartContainer } from "@/components/ui/charts"
import {
  CircleCheck,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Percent,
  Brain,
  Download,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Layout from "@/components/layout"

export default function AIInsights() {
  const [showApplyAgain, setShowApplyAgain] = useState(false)

  // Sample data for success prediction chart
  const successPredictionData = [
    { name: "Credit Score", value: 85 },
    { name: "Income", value: 92 },
    { name: "Debt-to-Income", value: 78 },
    { name: "Employment", value: 95 },
    { name: "Loan Amount", value: 70 },
    { name: "Loan Term", value: 88 },
  ]

  // Sample data for loan amount recommendation chart
  const loanAmountRecommendationData = [
    { name: "10k", value: 40 },
    { name: "15k", value: 65 },
    { name: "20k", value: 85 },
    { name: "25k", value: 75 },
    { name: "30k", value: 55 },
    { name: "35k", value: 35 },
    { name: "40k", value: 20 },
  ]

  return (    
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Your Loan Application Results</h2>
                <p className="mt-1 text-blue-100">
                  Our AI has analyzed your application and provided personalized insights
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button className="bg-white text-[#0a1525] hover:bg-blue-100">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="success">Success Prediction</TabsTrigger>
            <TabsTrigger value="amount">Loan Amount</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CircleCheck className="h-5 w-5 mr-2 text-green-500" />
                    Application Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">87%</div>
                  <p className="text-sm text-gray-500 mt-1">Probability of approval</p>
                  <Progress value={87} className="h-2 mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                    Recommended Loan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$20,000</div>
                  <p className="text-sm text-gray-500 mt-1">Based on your income</p>
                  <div className="flex items-center mt-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-500 font-medium">Optimal amount for your profile</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Percent className="h-5 w-5 mr-2 text-purple-500" />
                    Interest Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5.2%</div>
                  <p className="text-sm text-gray-500 mt-1">Estimated APR</p>
                  <div className="flex items-center mt-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-blue-500 font-medium">Better than average (6.8%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>AI Summary</CardTitle>
                <CardDescription>Based on our analysis of your application data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Brain className="h-5 w-5 mr-3 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Overall Assessment</h4>
                      <p className="text-gray-600 mt-1">
                        Your loan application shows a strong likelihood of approval with an 87% success probability.
                        Your credit score, income level, and employment history are all positive factors in your
                        application.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Strengths</h4>
                      <p className="text-gray-600 mt-1">
                        Your stable employment history and good credit score are significant strengths. Your
                        debt-to-income ratio is within acceptable limits, which positively impacts your application.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-3 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Areas for Improvement</h4>
                      <p className="text-gray-600 mt-1">
                        Reducing your existing debt could further improve your application. Consider a slightly shorter
                        loan term for better interest rates.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setShowApplyAgain(true)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Application
                </Button>
                <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">
                  Submit Application
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="success">
            <Card>
              <CardHeader>
                <CardTitle>Success Prediction Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of factors affecting your loan approval probability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <ChartContainer>
                    <LineChart
                      data={successPredictionData}
                      categories={["value"]}
                      colors={["#6366f1"]}
                      valueFormatter={(value) => `${value}%`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    />
                  </ChartContainer>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Credit Score</div>
                        <div className="text-green-500 font-medium">85%</div>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-sm text-gray-500 mt-2">
                        Your credit score is in the "Very Good" range, which significantly increases your approval
                        chances.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Income</div>
                        <div className="text-green-500 font-medium">92%</div>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-sm text-gray-500 mt-2">
                        Your income level is well above the minimum requirement for this loan amount.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Debt-to-Income</div>
                        <div className="text-green-500 font-medium">78%</div>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-sm text-gray-500 mt-2">
                        Your debt-to-income ratio is within acceptable limits but could be improved.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Employment</div>
                        <div className="text-green-500 font-medium">95%</div>
                      </div>
                      <Progress value={95} className="h-2" />
                      <p className="text-sm text-gray-500 mt-2">
                        Your stable employment history is a strong positive factor in your application.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full bg-[#0a1525] hover:bg-[#1a2b45]">Submit Application</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="amount">
            <Card>
              <CardHeader>
                <CardTitle>Loan Amount Recommendation</CardTitle>
                <CardDescription>Analysis of optimal loan amount based on your financial profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <ChartContainer>
                    <LineChart
                      data={loanAmountRecommendationData}
                      categories={["value"]}
                      colors={["#10b981"]}
                      valueFormatter={(value) => `${value}%`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                    />
                  </ChartContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">Optimal Loan Amount</h3>
                    <div className="text-3xl font-bold text-green-500">$20,000</div>
                    <p className="text-sm text-gray-500 mt-2">
                      Based on your income, expenses, and credit profile, we recommend a loan amount of $20,000. This
                      amount balances your needs with a manageable repayment schedule.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">Monthly Payment</h3>
                    <div className="text-3xl font-bold">$386</div>
                    <p className="text-sm text-gray-500 mt-2">
                      Estimated monthly payment for a $20,000 loan at 5.2% APR over 60 months. This represents
                      approximately 18% of your monthly income.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">Income-Based Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Recommended (18% of income)</span>
                      </div>
                      <span className="font-medium">$20,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span>Maximum Safe (25% of income)</span>
                      </div>
                      <span className="font-medium">$28,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span>Not Recommended (&gt;30% of income)</span>
                      </div>
                      <span className="font-medium">$35,000+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full bg-[#0a1525] hover:bg-[#1a2b45]">Apply for $20,000</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Personalized recommendations to improve your loan application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Consider a 48-month term</h4>
                        <p className="text-gray-600 mt-1">
                          Reducing your loan term from 60 to 48 months could lower your interest rate by 0.3%. While
                          your monthly payment would increase to $442, you would save $1,240 in interest over the life
                          of the loan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Pay down existing credit card debt</h4>
                        <p className="text-gray-600 mt-1">
                          Reducing your credit card debt by $2,000 would improve your debt-to-income ratio and could
                          increase your approval probability by 5-7%. This would also potentially qualify you for a
                          better interest rate.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <CircleCheck className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Add a co-signer</h4>
                        <p className="text-gray-600 mt-1">
                          While your application has a high probability of approval, adding a co-signer with excellent
                          credit could further improve your terms and potentially increase your maximum loan amount if
                          needed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-3 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Avoid new credit inquiries</h4>
                        <p className="text-gray-600 mt-1">
                          Multiple credit inquiries in a short period can temporarily lower your credit score. We
                          recommend avoiding new credit applications until after your loan is approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setShowApplyAgain(true)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Modify Application
                </Button>
                <Button className="bg-[#0a1525] hover:bg-[#1a2b45]">Submit Application</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  )
}

