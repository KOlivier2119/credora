export function getBackendUrl(): string {
  const url = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const onVercel = Boolean(process.env.VERCEL);
  const isLocal = !url || url.includes("localhost") || url.includes("127.0.0.1");

  if (onVercel && isLocal) {
    throw new Error(
      "Vercel cannot reach a local backend. In Vercel → Settings → Environment Variables set API_URL (and NEXT_PUBLIC_API_URL) to your public Spring Boot URL, e.g. https://api.yourdomain.com — then redeploy."
    );
  }

  return url || "http://localhost:8080";
}
