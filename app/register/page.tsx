"use client"
import type React from "react"
import { useState } from "react"
import {
  User,
  Mail,
  Lock,
  Phone,
  Home,
  Briefcase,
  DollarSign,
  Building,
  Globe,
  CreditCard,
  FileText,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
export default function SignUpPage() {
  const [userType, setUserType] = useState<"applicant" | "bank">("applicant")
  const [error, setError] = useState<string>("")
  // Applicant form state
  const [applicantForm, setApplicantForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    employment: "",
    income: "",
    idNumber: "",
  })
  // Bank form state
  const [bankForm, setBankForm] = useState({
    institutionName: "",
    registrationNumber: "",
    contactName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    website: "",
  })
  const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setApplicantForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBankForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userType === "applicant") {
      const { fullName, email, password, phone, address, employment, income, idNumber } = applicantForm
      if (!fullName || !email || !password || !phone || !address || !employment || !income || !idNumber) {
        setError("Please fill in all required fields.")
        return
      }
      console.log("Signing up as applicant:", applicantForm)
    } else {
      const { institutionName, registrationNumber, contactName, email, password, phone, address, website } = bankForm
      if (!institutionName || !registrationNumber || !contactName || !email || !password || !phone || !address) {
        setError("Please fill in all required fields.")
        return
      }
      console.log("Signing up as bank:", bankForm)
    }
    setError("")
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F2FF] to-[#F8F9FC] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-[#061525]"></div>
        <h1 className="text-4xl font-bold text-center mb-3 text-[#0A1124]">Create an Account</h1>
        <p className="text-center text-gray-600 mb-8">Join our platform to access loan services</p>
        {/* User Type Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1.5 rounded-xl flex w-full max-w-md">
            <button
              onClick={() => setUserType("applicant")}
              className={cn(
                "flex-1 py-3.5 px-4 rounded-lg text-center font-medium transition-all",
                userType === "applicant" ? "bg-white text-[#061525] shadow-sm" : "text-gray-600 hover:text-gray-800",
              )}
            >
              Loan Applicant
            </button>
            <button
              onClick={() => setUserType("bank")}
              className={cn(
                "flex-1 py-3.5 px-4 rounded-lg text-center font-medium transition-all",
                userType === "bank" ? "bg-white text-[#061525] shadow-sm" : "text-gray-600 hover:text-gray-800",
              )}
            >
              Financial Institution
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {/* Applicant Form */}
        {userType === "applicant" && (
          <form onSubmit={handleSubmit} className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <User className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={applicantForm.fullName}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Mail className="text-[#061525] min-w-5" size={22} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={applicantForm.email}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Lock className="text-[#061525] min-w-5" size={22} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={applicantForm.password}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Phone className="text-[#061525] min-w-5" size={22} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={applicantForm.phone}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all md:col-span-2">
                <Home className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="address"
                  placeholder="Residential Address *"
                  value={applicantForm.address}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Briefcase className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="employment"
                  placeholder="Employment Status *"
                  value={applicantForm.employment}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <DollarSign className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="income"
                  placeholder="Monthly Income *"
                  value={applicantForm.income}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all md:col-span-2">
                <CreditCard className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="idNumber"
                  placeholder="ID/Passport Number *"
                  value={applicantForm.idNumber}
                  onChange={handleApplicantChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#061525] text-white py-4 rounded-xl transition-all font-medium text-lg shadow-lg shadow-blue-200"
              >
                Create Applicant Account
              </button>
            </div>
          </form>
        )}
        {/* Bank Form */}
        {userType === "bank" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Building className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="institutionName"
                  placeholder="Institution Name *"
                  value={bankForm.institutionName}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <FileText className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Registration/License Number *"
                  value={bankForm.registrationNumber}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <User className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="contactName"
                  placeholder="Contact Person Name *"
                  value={bankForm.contactName}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Mail className="text-[#061525] min-w-5" size={22} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={bankForm.email}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Lock className="text-[#061525] min-w-5" size={22} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={bankForm.password}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
                <Phone className="text-[#061525] min-w-5" size={22} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={bankForm.phone}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all md:col-span-2">
                <Home className="text-[#061525] min-w-5" size={22} />
                <input
                  type="text"
                  name="address"
                  placeholder="Business Address *"
                  value={bankForm.address}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg"
                />
              </div>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all md:col-span-2">
                <Globe className="text-[#061525] min-w-5" size={22} />
                <input
                  type="url"
                  name="website"
                  placeholder="Institution Website (Optional)"
                  value={bankForm.website}
                  onChange={handleBankChange}
                  className="w-full ml-3 outline-none text-[#333] text-lg" />
              </div>
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#061525] text-white py-4 rounded-xl transition-all font-medium text-lg shadow-lg shadow-blue-200"
              >
                Create Institution Account
              </button>
            </div>
          </form>
        )}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-6 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
          Sign up with Google
        </button>
        <div className="flex items-center justify-between mt-10 pt-5 border-t border-gray-200">
          <div className="flex items-center">
            <ShieldCheck className="text-[#061525] mr-2" size={20} />
            <span className="text-sm text-gray-600">Secure Registration</span>
          </div>
          <p className="text-gray-600 text-lg">
            Already have an account?{" "}
            <Link href="/login" className="text-[#061525] hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}






