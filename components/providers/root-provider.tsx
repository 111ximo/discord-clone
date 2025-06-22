"use client";

import {ClerkProvider} from '@clerk/nextjs';

import { ModalProvider } from '@/components/providers/modal-provider';
import { SocketProvider } from '@/components/providers/socket-provider';
import { QueryProvider } from '@/components/providers/query-provider';

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