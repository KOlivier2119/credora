import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { getBackendUrl } from "@/lib/backend-url";

export async function POST() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: "Google session expired. Please try again." }, { status: 401 });
  }

  let backend: string;
  try {
    backend = getBackendUrl();
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Backend URL is not configured." },
      { status: 503 }
    );
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
      signal: AbortSignal.timeout(45000),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Could not create your Credora account from Google." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return NextResponse.json(
      {
        message: timedOut
          ? `Timed out reaching the API at ${backend}. Check API_URL on Vercel.`
          : `Cannot reach the Credora API at ${backend}. Set API_URL to your public backend, then redeploy.`,
      },
      { status: 502 }
    );
  }
}
