import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-auth-provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedOut>
              <div className="flex items-center justify-center flex-col">
                <div className="flex flex-col items-center mb-16">
                  <Image
                    src="/newt-ai-logo.png"
                    width={500}
                    height={100}
                    alt="Logo"
                    className="max-w-lg object-contain"
                  />
                  <p className="text-center text-xl text-purple-400">
                    Your AI powered sales assistant! Embed Newt AI into any
                    website with just a snippet of code!
                  </p>
                </div>
                <SignIn routing="hash" />
              </div>
            </SignedOut>
            <SignedIn>
              <SidebarProvider>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {children}
                  <Toaster />
                </main>
              </SidebarProvider>
            </SignedIn>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
