import "./globals.css";
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Open_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/providers/theme-provider";

// 动态导入组件
const ClerkProvider = dynamic(() => 
  import('@clerk/nextjs').then(mod => mod.ClerkProvider), 
  {ssr: false}
);
const ModalProvider = dynamic(() => 
  import('@/components/providers/modal-provider').then(mod => mod.ModalProvider),
);
const SocketProvider = dynamic(() => 
  import('@/components/providers/socket-provider').then(mod => mod.SocketProvider),
  {ssr: false}
);
const QueryProvider = dynamic(() => 
  import('@/components/providers/query-provider').then(mod => mod.QueryProvider),
);

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

  <html lang="en" suppressHydrationWarning>
    {/* <head>
      <link rel="preload" href="https://ruling-turtle-25.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js" as="script" />
      <link rel="preconnect" href="https://ruling-turtle-25.clerk.accounts.dev" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://ruling-turtle-25.clerk.accounts.dev" />
    </head> */}
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
        <ClerkProvider>
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
        </ClerkProvider>
      </ThemeProvider>
    </body>
  </html>
  );
}