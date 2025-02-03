import "./globals.css";
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Open_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/providers/theme-provider";
import Loading from '@/app/loading';

// 动态导入组件
const ClerkProvider = dynamic(() => 
  import('@clerk/nextjs').then(mod => mod.ClerkProvider), 
  { ssr: false }
);
const ModalProvider = dynamic(() => 
  import('@/components/providers/modal-provider').then(mod => mod.ModalProvider)
);
const SocketProvider = dynamic(() => 
  import('@/components/providers/socket-provider').then(mod => mod.SocketProvider)
);
const QueryProvider = dynamic(() => 
  import('@/components/providers/query-provider').then(mod => mod.QueryProvider)
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
          <Suspense fallback={<Loading />}>
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
          </Suspense>
        </ClerkProvider>
      </ThemeProvider>
    </body>
  </html>
  );
}