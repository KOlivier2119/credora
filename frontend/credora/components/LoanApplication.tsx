"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  DollarSign,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Loader2,
  Sparkles,
} from "lucide-react"
import Layout from "@/components/layout"
import AIInsights from "@/components/ai-insights"
import LoanTypeFields from "@/components/loan-type-fields"
import DocumentUploadField from "@/components/document-upload"
import { api, ApplicationResponse, DocumentUpload, getErrorMessage } from "@/lib/api"
import {
  LOAN_TYPES,
  LOAN_PURPOSES,
  getLoanTypeConfig,
  mapCreditScore,
  formatCurrency,
  COMMON_APPLICANT_FIELDS,
} from "@/lib/loan-types"

const formSchema = z.object({
  loanType: z.string().min(1, "Select a loan type"),
  amount: z.string().min(1, "Enter loan amount"),
  term: z.string().min(1, "Select loan term"),
  purpose: z.string().min(1, "Select loan purpose"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  idPassportNumber: z.string().min(1, "ID/Passport required"),
  employerName: z.string().optional(),
  bankName: z.string().min(1, "Bank name required"),
  bankAccountNumber: z.string().min(1, "Account number required"),
  income: z.string().min(1, "Enter monthly income"),
  employment: z.string().min(1, "Select employment status"),
  creditScore: z.string().min(1, "Enter or estimate credit score"),
  mobileMoneyAvg: z.string().optional(),
  utilityPaymentScore: z.string().optional(),
  existingDebt: z.string().optional(),
  sectorDetails: z.record(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

const STEPS = ["Loan Type", "Details", "Personal", "Financial", "Documents", "Review"]

export default function LoanApplication() {
  const [step, setStep] = useState(0)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [applicationResult, setApplicationResult] = useState<ApplicationResponse | null>(null)
  const [documents, setDocuments] = useState<Record<string, DocumentUpload>>({})

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: "",
      amount: "",
      term: "",
      purpose: "",
      income: "",
      employment: "",
      creditScore: "",
      mobileMoneyAvg: "",
      utilityPaymentScore: "70",
      existingDebt: "",
      idPassportNumber: "",
      employerName: "",
      bankName: "",
      bankAccountNumber: "",
      sectorDetails: {},
    },
  })

  const selectedLoanType = form.watch("loanType")
  const loanConfig = getLoanTypeConfig(selectedLoanType)
  const filteredPurposes = selectedLoanType
    ? LOAN_PURPOSES.filter((p) => loanConfig?.purposes.includes(p.id))
    : LOAN_PURPOSES

  const submitApplication = async () => {
    const values = form.getValues()
    setSubmitting(true)
    setSubmitError("")
    try {
      const payload = {
        ...values,
        creditScore: mapCreditScore(values.creditScore),
        sectorDetails: values.sectorDetails || {},
        documents: Object.values(documents),
      }
      const { data } = await api.post<ApplicationResponse>("/applications", payload)
      setApplicationResult(data)
      setShowAIInsights(true)
    } catch (err) {
      setSubmitError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const validateStep = async (): Promise<boolean> => {
    switch (step) {
      case 0:
        return form.trigger("loanType")
      case 1: {
        const ok = await form.trigger(["purpose", "amount", "term"])
        if (!ok) return false
        const amount = parseFloat(form.getValues("amount").replace(/[^0-9.]/g, ""))
        if (loanConfig && (amount < loanConfig.minAmount || amount > loanConfig.maxAmount)) {
          form.setError("amount", {
            message: `Amount must be ${formatCurrency(loanConfig.minAmount)} – ${formatCurrency(loanConfig.maxAmount)}`,
          })
          return false
        }
        if (loanConfig) {
          for (const field of loanConfig.sectorFields.filter((f) => f.required)) {
            const val = form.getValues(`sectorDetails.${field.name}` as keyof FormValues)
            if (!val) {
              form.setError(`sectorDetails.${field.name}` as keyof FormValues, {
                message: `${field.label} is required`,
              })
              return false
            }
          }
        }
        return true
      }
      case 2:
        return form.trigger(["firstName", "lastName", "phone", "idPassportNumber", "bankName", "bankAccountNumber"])
      case 3:
        return form.trigger(["income", "employment", "creditScore"])
      case 4: {
        if (!loanConfig) return true
        for (const doc of loanConfig.requiredDocuments) {
          if (!documents[doc.type]) {
            setSubmitError(`Please upload: ${doc.label}`)
            return false
          }
        }
        setSubmitError("")
        return true
      }
      default:
        return true
    }
  }

  const handleNext = async () => {
    const valid = await validateStep()
    if (!valid) return
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      submitApplication()
    }
  }

  const handleLoanTypeSelect = (typeId: string) => {
    form.setValue("loanType", typeId)
    form.setValue("purpose", "")
    form.setValue("term", "")
    form.setValue("sectorDetails", {})
    const config = getLoanTypeConfig(typeId)
    if (config) {
      form.setValue("term", String(config.terms[Math.min(2, config.terms.length - 1)]))
    }
  }

  return (
    <Layout title="Apply For Loan">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!showAIInsights ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#0a1525] to-[#1a2b45] text-white rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-300" />
                    <div>
                      <CardTitle className="text-2xl">Loan Application</CardTitle>
                      <CardDescription className="text-blue-100">
                        Step {step + 1} of {STEPS.length}: {STEPS[step]}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      {STEPS.map((label, i) => (
                        <div key={label} className="flex flex-col items-center flex-1">
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              i <= step ? "bg-[#0a1525] text-white" : "bg-gray-200 text-gray-500"
                            }`}
                            animate={i === step ? { scale: [1, 1.15, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {i < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
                          </motion.div>
                          <span className="text-xs mt-1 text-center hidden sm:block">{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#0a1525] to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <Form {...form}>
                    <form className="space-y-6">
                      <AnimatePresence mode="wait">
                        {/* Step 0: Loan Type Selection */}
                        {step === 0 && (
                          <motion.div
                            key="step0"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-gray-600 mb-4">Choose the type of loan that fits your needs:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {LOAN_TYPES.map((type) => {
                                const Icon = type.icon
                                const selected = selectedLoanType === type.id
                                return (
                                  <motion.div
                                    key={type.id}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                                      selected
                                        ? "border-blue-500 bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-blue-300"
                                    }`}
                                    onClick={() => handleLoanTypeSelect(type.id)}
                                  >
                                    <div className="flex items-center gap-3 mb-2">
                                      <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                          selected ? "bg-blue-500 text-white" : "bg-gray-100"
                                        }`}
                                      >
                                        <Icon className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <p className="font-semibold">{type.name}</p>
                                        <p className="text-xs text-gray-500">
                                          {formatCurrency(type.minAmount)} – {formatCurrency(type.maxAmount)}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{type.description}</p>
                                    <p className="text-xs text-blue-600 mt-2">From {type.baseApr}% APR</p>
                                  </motion.div>
                                )
                              })}
                            </div>
                            <FormField control={form.control} name="loanType" render={() => <FormMessage />} />
                          </motion.div>
                        )}

                        {/* Step 1: Loan Details + Sector Fields */}
                        {step === 1 && loanConfig && (
                          <motion.div
                            key="step1"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="purpose"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Loan Purpose</FormLabel>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {filteredPurposes.map((purpose) => (
                                      <motion.div
                                        key={purpose.id}
                                        whileHover={{ scale: 1.01 }}
                                        className={`border rounded-lg p-3 cursor-pointer ${
                                          field.value === purpose.id ? "border-blue-500 bg-blue-50" : ""
                                        }`}
                                        onClick={() => field.onChange(purpose.id)}
                                      >
                                        <p className="font-medium">{purpose.name}</p>
                                        <p className="text-xs text-gray-500">{purpose.description}</p>
                                      </motion.div>
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Loan Amount</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                        <Input className="pl-10" placeholder="Enter amount" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormDescription>
                                      {formatCurrency(loanConfig.minAmount)} – {formatCurrency(loanConfig.maxAmount)}
                                    </FormDescription>
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
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select term" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {loanConfig.terms.map((t) => (
                                          <SelectItem key={t} value={String(t)}>
                                            {t >= 12 ? `${t / 12} years (${t} months)` : `${t} months`}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <LoanTypeFields loanType={selectedLoanType} control={form.control} />
                          </motion.div>
                        )}

                        {/* Step 2: Personal Info */}
                        {step === 2 && (
                          <motion.div
                            key="step2"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-sm text-blue-800">
                                Applying for a <strong>{loanConfig?.name}</strong> of{" "}
                                <strong>${form.getValues("amount")}</strong>
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <FormField control={form.control} name="firstName" render={({ field }) => (
                                <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="First name" {...field} /></FormControl></FormItem>
                              )} />
                              <FormField control={form.control} name="lastName" render={({ field }) => (
                                <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Last name" {...field} /></FormControl></FormItem>
                              )} />
                            </div>
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Email" {...field} /></FormControl></FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Phone number" {...field} /></FormControl></FormItem>
                            )} />
                            <FormField control={form.control} name="address" render={({ field }) => (
                              <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="Street address" {...field} /></FormControl></FormItem>
                            )} />
                            <div className="grid grid-cols-3 gap-4">
                              <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                              )} />
                              <FormField control={form.control} name="state" render={({ field }) => (
                                <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                              )} />
                              <FormField control={form.control} name="zipCode" render={({ field }) => (
                                <FormItem><FormLabel>Zip</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                              )} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {COMMON_APPLICANT_FIELDS.map((field) => (
                                <FormField
                                  key={field.name}
                                  control={form.control}
                                  name={field.name as "idPassportNumber" | "employerName" | "bankName" | "bankAccountNumber"}
                                  render={({ field: f }) => (
                                    <FormItem>
                                      <FormLabel>
                                        {field.label}
                                        {field.required && <span className="text-red-500"> *</span>}
                                      </FormLabel>
                                      <FormControl><Input placeholder={field.label} {...f} /></FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Financial Info */}
                        {step === 3 && (
                          <motion.div
                            key="step3"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                              <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                              <p className="text-sm text-blue-700">
                                Credora uses alternative data (mobile money, utility payments) to assess thin-file borrowers.
                              </p>
                            </div>

                            <FormField control={form.control} name="income" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Income</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input className="pl-10" placeholder="Gross monthly income" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />

                            <FormField control={form.control} name="employment" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Employment Status</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                                  <SelectContent>
                                    <SelectItem value="full_time">Full-time</SelectItem>
                                    <SelectItem value="part_time">Part-time</SelectItem>
                                    <SelectItem value="self_employed">Self-employed</SelectItem>
                                    <SelectItem value="business_owner">Business Owner</SelectItem>
                                    <SelectItem value="unemployed">Unemployed</SelectItem>
                                    <SelectItem value="retired">Retired</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />

                            <FormField control={form.control} name="creditScore" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Credit Score</FormLabel>
                                <Tabs defaultValue="know">
                                  <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="know">I know my score</TabsTrigger>
                                    <TabsTrigger value="estimate">Estimate for me</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="know" className="pt-4">
                                    <FormControl><Input placeholder="300-850" {...field} /></FormControl>
                                  </TabsContent>
                                  <TabsContent value="estimate" className="pt-4">
                                    <Select onValueChange={field.onChange}>
                                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
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
                                <FormMessage />
                              </FormItem>
                            )} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField control={form.control} name="mobileMoneyAvg" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Mobile Money (monthly avg)</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                      <Input className="pl-10" placeholder="M-Pesa / mobile wallet volume" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormDescription>Alternative credit signal for thin-file borrowers</FormDescription>
                                </FormItem>
                              )} />
                              <FormField control={form.control} name="utilityPaymentScore" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Utility Payment Score (0-100)</FormLabel>
                                  <FormControl><Input type="number" min={0} max={100} placeholder="70" {...field} /></FormControl>
                                  <FormDescription>How regularly you pay utilities</FormDescription>
                                </FormItem>
                              )} />
                            </div>

                            {selectedLoanType !== "personal" && (
                              <FormField control={form.control} name="existingDebt" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Existing Monthly Debt</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                      <Input className="pl-10" placeholder="Total monthly obligations" {...field} />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )} />
                            )}
                          </motion.div>
                        )}

                        {/* Step 4: KYC Documents */}
                        {step === 4 && loanConfig && (
                          <motion.div
                            key="step4docs"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <p className="text-sm text-gray-600">
                              Upload required documents for your {loanConfig.name}. All files are encrypted.
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                              {loanConfig.requiredDocuments.map((doc) => (
                                <DocumentUploadField
                                  key={doc.type}
                                  label={doc.label}
                                  documentType={doc.type}
                                  required
                                  value={documents[doc.type]}
                                  onChange={(d) =>
                                    setDocuments((prev) => {
                                      const next = { ...prev }
                                      if (d) next[doc.type] = d
                                      else delete next[doc.type]
                                      return next
                                    })
                                  }
                                />
                              ))}
                            </div>
                            {submitError && step === 4 && (
                              <p className="text-red-600 text-sm">{submitError}</p>
                            )}
                          </motion.div>
                        )}

                        {/* Step 5: Review */}
                        {step === 5 && (
                          <motion.div
                            key="step4"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="rounded-lg border p-6 space-y-3">
                              <h3 className="font-semibold text-lg">Review Your Application</h3>
                              {[
                                ["Loan Type", loanConfig?.name],
                                ["Purpose", form.getValues("purpose")],
                                ["Amount", `$${form.getValues("amount")}`],
                                ["Term", `${form.getValues("term")} months`],
                                ["Monthly Income", `$${form.getValues("income")}`],
                                ["Employment", form.getValues("employment")],
                              ].map(([label, value]) => (
                                <div key={label} className="flex justify-between text-sm border-b pb-2">
                                  <span className="text-gray-500">{label}</span>
                                  <span className="font-medium capitalize">{value}</span>
                                </div>
                              ))}
                            </div>
                            {submitError && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-600 text-sm bg-red-50 p-3 rounded-lg"
                              >
                                {submitError}
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between pt-4">
                        {step > 0 && (
                          <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={submitting}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                          </Button>
                        )}
                        <Button
                          type="button"
                          className="ml-auto bg-[#0a1525] hover:bg-[#1a2b45]"
                          onClick={handleNext}
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Scoring...
                            </>
                          ) : step < STEPS.length - 1 ? (
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

                <CardFooter className="bg-gray-50 border-t p-4 text-center text-sm text-gray-500">
                  Your information is secure and encrypted. Alternative data helps expand credit access.
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AIInsights application={applicationResult} onBack={() => { setShowAIInsights(false); setStep(0) }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}
