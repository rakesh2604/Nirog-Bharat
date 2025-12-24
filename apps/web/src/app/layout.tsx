import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { TrpcProvider } from "@/components/trpc-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nirog Bharat | Your Health, Your Control",
  description: "Secure, Patient-Controlled Digital Health Vault. Access your records anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <TrpcProvider>
              {children}
            </TrpcProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
