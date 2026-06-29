"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api, getErrorMessage } from "@/lib/api"

interface PhoneVerificationProps {
  phone: string
  onVerified: (verified: boolean) => void
}

export default function PhoneVerification({ phone, onVerified }: PhoneVerificationProps) {
  const [code, setCode] = useState("")
  const [devCode, setDevCode] = useState("")
  const [status, setStatus] = useState<"idle" | "sent" | "verified">("idle")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    if (!phone) {
      setError("Enter phone number first")
      return
    }
    setLoading(true)
    setError("")
    try {
      const { data } = await api.post<{ message: string; devCode?: string }>("/verify/otp/send", {
        phoneNumber: phone,
      })
      setDevCode(data.devCode || "")
      setStatus("sent")
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setLoading(true)
    setError("")
    try {
      await api.post("/verify/otp/confirm", { phoneNumber: phone, code })
      setStatus("verified")
      onVerified(true)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const verifyMpesa = async () => {
    setLoading(true)
    setError("")
    try {
      await api.post("/verify/mpesa", { phoneNumber: phone, amount: 5000 })
      onVerified(true)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-3">
      <p className="text-sm font-medium text-green-800">Kenya phone & M-Pesa verification</p>
      {status !== "verified" ? (
        <>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={sendOtp} disabled={loading}>
              Send OTP
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={verifyMpesa} disabled={loading}>
              Verify M-Pesa (sandbox)
            </Button>
          </div>
          {devCode && (
            <p className="text-xs text-green-700">Dev OTP code: <strong>{devCode}</strong></p>
          )}
          {status === "sent" && (
            <div className="flex gap-2">
              <Input
                placeholder="Enter 6-digit OTP"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
              <Button type="button" size="sm" onClick={verifyOtp} disabled={loading}>
                Verify
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-green-700">Phone verified successfully</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
