import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { getBackendUrl } from "@/lib/backend-url";
import { GoogleCallbackClient } from "./google-callback-client";

async function exchangeGoogleSession() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return { error: "Google sign-in did not finish. Please try again from the login page." };
  }

  let backend: string;
  try {
    backend = getBackendUrl();
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Backend URL is not configured." };
  }

  try {
    const response = await fetch(`${backend}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fullName: session.user?.name || email,
        googleId: session.user?.id || "",
      }),
      signal: AbortSignal.timeout(12000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { error: data.message || "Could not create your Credora account from Google." };
    }
    if (!data.token || !data.user) {
      return { error: "The API did not return a login token." };
    }
    return { payload: data };
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return {
      error: timedOut
        ? `Timed out reaching the API at ${backend}. Set API_URL on Vercel to your public Spring Boot URL.`
        : `Cannot reach the Credora API at ${backend}. Vercel cannot call localhost — deploy the backend and set API_URL.`,
    };
  }
}

export default async function GoogleCallbackPage() {
  const result = await exchangeGoogleSession();

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-slate-50 to-background">
      <GoogleCallbackClient initialError={result.error} payload={result.payload} />
    </div>
  );
}
