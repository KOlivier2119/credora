"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DollarSign } from "lucide-react"
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

  return (
    <Layout title="Apply For Loan">
      <div className="max-w-4xl mx-auto">
        {!showAIInsights ? (
          <Card>
            <CardHeader>
              <CardTitle>Loan Application</CardTitle>
              <CardDescription>
                Fill out the form below to apply for a loan. Our AI will analyze your application and provide insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#0a1525] text-white" : "bg-gray-200"}`}
                    >
                      1
                    </div>
                    <div className="ml-2 font-medium">Loan Details</div>
                  </div>
                  <div className="flex-1 mx-4 h-1 bg-gray-200">
                    <div className={`h-full bg-[#0a1525] ${step >= 2 ? "w-full" : "w-0"}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#0a1525] text-white" : "bg-gray-200"}`}
                    >
                      2
                    </div>
                    <div className="ml-2 font-medium">Personal Information</div>
                  </div>
                  <div className="flex-1 mx-4 h-1 bg-gray-200">
                    <div className={`h-full bg-[#0a1525] ${step >= 3 ? "w-full" : "w-0"}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#0a1525] text-white" : "bg-gray-200"}`}
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
                        name="purpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Purpose</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select loan purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="debt_consolidation">Debt Consolidation</SelectItem>
                                <SelectItem value="home_improvement">Home Improvement</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="major_purchase">Major Purchase</SelectItem>
                                <SelectItem value="medical">Medical Expenses</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
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
                            <FormControl>
                              <Input placeholder="Enter your credit score" {...field} />
                            </FormControl>
                            <FormDescription>Enter your estimated credit score (300-850)</FormDescription>
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
                      {step < 3 ? "Next" : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <AIInsights />
        )}
      </div>
    </Layout>
  )
}

