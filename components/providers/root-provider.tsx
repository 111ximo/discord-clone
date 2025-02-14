"use client";

import dynamic from 'next/dynamic';

const ClerkProvider = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.ClerkProvider),
  { 
    loading: () => <div className="h-full w-full flex items-center justify-center">Loading...</div>,
    ssr: false 
  }
);

const ModalProvider = dynamic(
  () => import('@/components/providers/modal-provider').then(mod => mod.ModalProvider),
  { ssr: false }
);

const SocketProvider = dynamic(
  () => import('@/components/providers/socket-provider').then(mod => mod.SocketProvider),
  { ssr: false }
);

const QueryProvider = dynamic(
  () => import('@/components/providers/query-provider').then(mod => mod.QueryProvider),
  { ssr: false }
);

export const RootProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider>
            <SocketProvider>
                <ModalProvider />
                <QueryProvider>
                    {children}
                </QueryProvider>
            </SocketProvider>
        </ClerkProvider>
    );
}; 