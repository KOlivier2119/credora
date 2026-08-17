import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Credora — AI Credit Scoring",
  description:
    "Alternative-data credit scoring for applicants without traditional credit history.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        <Theme accentColor="blue" grayColor="slate" radius="medium">
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
