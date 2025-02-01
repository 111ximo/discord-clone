import "./globals.css";
import type { Metadata } from "next";
import {Open_Sans} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'

import {cn} from '@/lib/utils'
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter=Open_Sans({subsets:['latin']})

export const metadata: Metadata = {
  title: "Discord-clone",
  description: "A Discord clone built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          inter.className,
          "bg-white dark:bg-[#313338]"
        )}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <SocketProvider>
                <ModalProvider />
                <QueryProvider>
                  {children}
                </QueryProvider>
              </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  ); 
}


//import localFont from "next/font/local";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });