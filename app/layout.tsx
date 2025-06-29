import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RootProvider } from "@/components/providers/root-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

// 预加载字体子集
const inter = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

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
          <RootProvider>
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}