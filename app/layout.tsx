import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BzNav from "@/components/ui/bznav";
import Footer from "@/components/ui/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { IBM_Plex_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const fontHeading = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '700'
})

const fontBody = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400'
})

export const metadata: Metadata = {
  title: "Desiadzone",
  description: "Online Market Place by @noodlescripter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BzNav />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
