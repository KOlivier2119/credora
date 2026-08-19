import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

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

function googleProvider(): NextAuthOptions["providers"] {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return [];

  return [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "online",
          response_type: "code",
        },
      },
    }),
  ];
}

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

export const authOptions: NextAuthOptions = {
  providers: googleProvider(),
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.providerAccountId) {
        token.sub = account.providerAccountId;
      } else if (profile?.sub) {
        token.sub = profile.sub;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/oauth-error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: isProduction,
  debug: process.env.NEXTAUTH_DEBUG === "true",
};
