import type { Metadata } from "next";
import "./globals.css";
import {Open_Sans} from 'next/font/google'
const inter=Open_Sans({subsets:['latin']})
import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs'
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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
