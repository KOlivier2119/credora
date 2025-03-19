"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DollarSign, CreditCard, Briefcase, Home, CheckCircle, ArrowRight, ArrowLeft, HelpCircle } from "lucide-react"
import Layout from "@/components/layout"
import AIInsights from "@/components/ai-insights"

// Update the form schema to make it less strict for the multi-step form
const formSchema = z.object({
  loanType: z.string().optional(),
  amount: z.string().optional(),
  term: z.string().optional(),
  purpose: z.string().optional(),
  income: z.string().optional(),
  employment: z.string().optional(),
  creditScore: z.string().optional(),
})

export default function LoanApplication() {
  const [step, setStep] = useState(1)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [loanPurpose, setLoanPurpose] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: "",
      amount: "",
      term: "",
      purpose: "",
      income: "",
      employment: "",
      creditScore: "",
    },
  })

  // Update the onSubmit function to properly handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Log the form values for debugging
      console.log("Form submitted:", values)
      setShowAIInsights(true)
    }
  }

  // Fix the form validation to be less strict during step navigation
  // Only validate the current step's fields when moving to the next step
  const handleNext = () => {
    if (step === 1) {
      const loanTypeValid = form.getValues("loanType") !== ""
      const amountValid = form.getValues("amount") !== ""
      const termValid = form.getValues("term") !== ""
      const purposeValid = form.getValues("purpose") !== ""

      if (loanTypeValid && amountValid && termValid && purposeValid) {
        setStep(2)
      } else {
        // Trigger validation only for the fields in the current step
        form.trigger(["loanType", "amount", "term", "purpose"])
      }
    } else if (step === 2) {
      // For step 2, we don't have required fields in the schema, so just proceed
      setStep(3)
    } else if (step === 3) {
      const incomeValid = form.getValues("income") !== ""
      const employmentValid = form.getValues("employment") !== ""
      const creditScoreValid = form.getValues("creditScore") !== ""

      if (incomeValid && employmentValid && creditScoreValid) {
        setShowAIInsights(true)
      } else {
        // Trigger validation only for the fields in the current step
        form.trigger(["income", "employment", "creditScore"])
      }
    }
  }

  // Loan purpose options with icons
  const loanPurposes = [
    {
      id: "home_improvement",
      name: "Home Improvement",
      icon: Home,
      description: "Renovations, repairs, or upgrades to your home",
    },
    {
      id: "debt_consolidation",
      name: "Debt Consolidation",
      icon: CreditCard,
      description: "Combine multiple debts into a single payment",
    },
    { id: "business", name: "Business", icon: Briefcase, description: "Start or grow your business" },
    {
      id: "education",
      name: "Education",
      icon: CheckCircle,
      description: "Education expenses or student loan refinancing",
    },
    { id: "medical", name: "Medical Expenses", icon: CheckCircle, description: "Medical bills or healthcare costs" },
    { id: "other", name: "Other", icon: CheckCircle, description: "Other personal expenses" },
  ]

  return (
    <Layout title="Apply For Loan">
      <div className="max-w-4xl mx-auto">
        {!showAIInsights ? (
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white rounded-t-lg">
              <CardTitle className="text-2xl">Loan Application</CardTitle>
              <CardDescription className="text-blue-100">
                Complete your application to get personalized loan offers
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#0a1525] text-white" : "bg-gray-200"}`}
                    >
                      1
                    </div>
                    <div className="ml-2 font-medium">Loan Details</div>
                  </div>
                  <div className="flex-1 mx-4 h-1 bg-gray-200">
                    <div
                      className={`h-full bg-[#0a1525] transition-all duration-500 ${step >= 2 ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#0a1525] text-white" : "bg-gray-200"}`}
                    >
                      2
                    </div>
                    <div className="ml-2 font-medium">Personal Information</div>
                  </div>
                  <div className="flex-1 mx-4 h-1 bg-gray-200">
                    <div
                      className={`h-full bg-[#0a1525] transition-all duration-500 ${step >= 3 ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#0a1525] text-white" : "bg-gray-200"}`}
                    >
                      3
                    </div>
                    <div className="ml-2 font-medium">Financial Information</div>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex items-start">
                          <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800">Why we need this information</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              These details help us determine the loan options you qualify for. Your information is
                              secure and will only be used to process your application.
                            </p>
                          </div>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Purpose</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                              {loanPurposes.map((purpose) => (
                                <div
                                  key={purpose.id}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                                    field.value === purpose.id ? "border-blue-500 bg-blue-50" : ""
                                  }`}
                                  onClick={() => {
                                    field.onChange(purpose.id)
                                    setLoanPurpose(purpose.name)
                                  }}
                                >
                                  <div className="flex items-center mb-2">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        field.value === purpose.id ? "bg-blue-500 text-white" : "bg-gray-100"
                                      }`}
                                    >
                                      <purpose.icon className="h-4 w-4" />
                                    </div>
                                    <span className="ml-2 font-medium">{purpose.name}</span>
                                  </div>
                                  <p className="text-xs text-gray-500">{purpose.description}</p>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input className="pl-10" placeholder="Enter amount" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>Enter the amount you wish to borrow</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="term"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Term</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select loan term" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="6">6 months</SelectItem>
                                <SelectItem value="12">12 months</SelectItem>
                                <SelectItem value="24">24 months</SelectItem>
                                <SelectItem value="36">36 months</SelectItem>
                                <SelectItem value="48">48 months</SelectItem>
                                <SelectItem value="60">60 months</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="loanType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select loan type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="personal">Personal Loan</SelectItem>
                                <SelectItem value="business">Business Loan</SelectItem>
                                <SelectItem value="mortgage">Mortgage</SelectItem>
                                <SelectItem value="auto">Auto Loan</SelectItem>
                                <SelectItem value="education">Education Loan</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800">Loan Details Saved</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              {loanPurpose || "Your"} loan for ${form.getValues("amount") || "0"} over{" "}
                              {form.getValues("term") || "0"} months
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" />
                          </FormControl>
                        </FormItem>
                      </div>
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" />
                        </FormControl>
                      </FormItem>
                      <div className="grid grid-cols-3 gap-6">
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Zip Code" />
                          </FormControl>
                        </FormItem>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex items-start">
                          <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800">Why we need your financial information</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              This helps us determine your loan eligibility and offer you the best rates. Your
                              information is secure and protected.
                            </p>
                          </div>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="income"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Income</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input className="pl-10" placeholder="Enter monthly income" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>Enter your gross monthly income before taxes</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employment Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employment status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="full_time">Full-time</SelectItem>
                                <SelectItem value="part_time">Part-time</SelectItem>
                                <SelectItem value="self_employed">Self-employed</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="creditScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credit Score (Estimated)</FormLabel>
                            <Tabs defaultValue="know" className="w-full mb-4">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="know">I know my score</TabsTrigger>
                                <TabsTrigger value="estimate">Estimate for me</TabsTrigger>
                              </TabsList>
                              <TabsContent value="know" className="pt-4">
                                <FormControl>
                                  <Input placeholder="Enter your credit score (300-850)" {...field} />
                                </FormControl>
                              </TabsContent>
                              <TabsContent value="estimate" className="pt-4">
                                <Select onValueChange={field.onChange}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select estimated range" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="excellent">Excellent (720-850)</SelectItem>
                                    <SelectItem value="good">Good (690-719)</SelectItem>
                                    <SelectItem value="fair">Fair (630-689)</SelectItem>
                                    <SelectItem value="poor">Poor (580-629)</SelectItem>
                                    <SelectItem value="bad">Bad (300-579)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TabsContent>
                            </Tabs>
                            <FormDescription>Your credit score helps determine your interest rate</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel>Existing Debt</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input className="pl-10" placeholder="Enter total existing debt" />
                          </div>
                        </FormControl>
                        <FormDescription>Enter the total of your existing debt obligations</FormDescription>
                      </FormItem>
                    </>
                  )}

                  <div className="flex justify-between pt-4">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    )}
                    <Button
                      type="button"
                      className="ml-auto bg-[#0a1525] hover:bg-[#1a2b45]"
                      onClick={() => {
                        if (step < 3) {
                          setStep(step + 1)
                        } else {
                          setShowAIInsights(true)
                        }
                      }}
                    >
                      {step < 3 ? (
                        <>
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg border-t p-4 text-center text-sm text-gray-500">
              Your information is secure and encrypted. We never share your data without permission.
            </CardFooter>
          </Card>
        ) : (
          <div className="p-6">
            <AIInsights />
          </div>
        )}
      </div>
    </Layout>
  )
}

