import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

function googleProvider(): Provider[] {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return [];

  // Explicit endpoints skip accounts.google.com/.well-known discovery,
  // which NextAuth times out after 3.5s and often fails on IPv6.
  return [
    GoogleProvider({
      clientId,
      clientSecret,
      wellKnown: undefined,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "select_account",
          response_type: "code",
          scope: "openid email profile",
        },
      },
      token: "https://oauth2.googleapis.com/token",
      userinfo: "https://openidconnect.googleapis.com/v1/userinfo",
      httpOptions: { timeout: 20000 },
    }),
  ];
}

export const authOptions = {
  providers: googleProvider(),
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Vercel preview/prod URLs differ; trust the incoming host when NEXTAUTH_URL is set.
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith("https://") ?? process.env.VERCEL === "1",
};
