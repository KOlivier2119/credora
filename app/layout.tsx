import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const fira =   Fira_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fira-sans",
});

export const metadata: Metadata = {
  title: "Credora",
  description: "Generated by Credora team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira.variable} antialiased bg-gray-50`}>
        <Theme>
        {children}
        </Theme>
      </body>
    </html>
  );
}
