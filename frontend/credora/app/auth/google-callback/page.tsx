"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { api, setAuth } from "@/lib/api"

export default function GoogleCallbackPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user?.email) {
      router.push("/login")
      return
    }

    const exchange = async () => {
      try {
        const { data } = await api.post("/auth/google", {
          email: session.user!.email,
          fullName: session.user!.name || session.user!.email,
          googleId: session.user!.id,
        })
        const userType =
          (typeof window !== "undefined" && sessionStorage.getItem("preferredUserType")) === "bank"
            ? "institution"
            : "applicant"
        if (userType === "institution") {
          setError("Google sign-in is for applicants only. Use institution credentials.")
          return
        }
        setAuth(data.token, "applicant", data.user, true)
        document.cookie = `credora_token=${data.token}; path=/; max-age=86400`
        router.push("/dashboard")
      } catch {
        setError("Failed to complete Google sign-in. Please try email login.")
      }
    }
    exchange()
  }, [session, status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-gray-600">Completing Google sign-in...</p>
          </>
        )}
      </div>
    </div>
  )
}
