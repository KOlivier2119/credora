"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [userType, setUserType] = useState<"applicant" | "bank">("applicant");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  // Handle redirection when success message is set
  useEffect(() => {
    if (success) {
      const redirectTimer = setTimeout(() => {
        if (userType === "applicant") {
          router.push("/dashboard");
        } else {
          router.push("/admin");
        }
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [success, userType, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Store the user type before redirecting to Google
      sessionStorage.setItem("preferredUserType", userType);

      await signIn("google", {
        callbackUrl: userType === "applicant" ? "/dashboard" : "/admin",
        redirect: true,
      });
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (userType === "applicant") {
        // Applicant login
        const response = await axios.post(
          "https://credora-web-service.onrender.com/auth/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      
        
        if (response.status === 201) {
          // Store token in localStorage or sessionStorage based on remember me
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("token", response.data.token);
          storage.setItem("userType", "applicant");
          storage.setItem("userData", JSON.stringify(response.data.user));
          
          setSuccess("Login successful! Redirecting to dashboard...");
        }
        console.log({email,password,response})
      } else {
        // Institution login
        const response = await axios.post(
          "https://credora-web-service.onrender.com/auth/login-institution",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          // Store token in localStorage or sessionStorage based on remember me
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("token", response.data.token);
          storage.setItem("userType", "institution");
          storage.setItem(
            "userData",
            JSON.stringify(response.data.institution)
          );

          setSuccess("Login successful! Redirecting to admin dashboard...");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(
            err.response.data.message ||
              "Invalid credentials. Please try again."
          );
        } else if (err.request) {
          setError("No response received from the server. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F2FF] to-[#F8F9FC] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-[#061525]"></div>

        <h1 className="text-4xl font-bold text-center mb-3 text-[#0A1124]">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Log in to your account to continue
        </p>

        {/* User Type Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1.5 rounded-xl flex w-full max-w-md">
            <button
              type="button"
              onClick={() => setUserType("applicant")}
              className={cn(
                "flex-1 py-3.5 px-4 rounded-lg text-center font-medium transition-all",
                userType === "applicant"
                  ? "bg-white text-[#061525] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Loan Applicant
            </button>
            <button
              type="button"
              onClick={() => setUserType("bank")}
              className={cn(
                "flex-1 py-3.5 px-4 rounded-lg text-center font-medium transition-all",
                userType === "bank"
                  ? "bg-white text-[#061525] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
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

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div className="space-y-5">
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
              <Mail className="text-[#061525] min-w-5" size={22} />
              <input
                type="email"
                placeholder={
                  userType === "applicant"
                    ? "Email Address"
                    : "Institution Email"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ml-3 outline-none text-[#333] text-lg"
                disabled={loading}
              />
            </div>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-5 py-4 focus-within:border-[#061525] focus-within:ring-2 focus-within:ring-[#061525]/20 transition-all">
              <Lock className="text-[#061525] min-w-5" size={22} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ml-3 outline-none text-[#333] text-lg"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#061525] border-gray-300 rounded focus:ring-[#061525]"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#061525] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#061525] text-white py-4 rounded-xl transition-all font-medium text-lg shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : userType === "applicant" ? (
              "Log In as Applicant"
            ) : (
              "Log In as Institution"
            )}
          </button>
        </form>

        <div className="flex items-center my-8 max-w-md mx-auto">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-6 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg disabled:opacity-70"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-6 h-6"
            />
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in with Google...
              </>
            ) : (
              `Sign in with Google as ${
                userType === "applicant" ? "Applicant" : "Institution"
              }`
            )}
          </button>

          <div className="flex items-center justify-between mt-10 pt-5 border-t border-gray-200">
            <p className="text-gray-600 text-lg">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#061525] hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>

            {userType === "bank" ? (
              <div className="bg-blue-50 text-[#061525] text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                Institution Portal
              </div>
            ) : (
              <div className="bg-blue-50 text-[#061525] text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                Applicant Portal
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
