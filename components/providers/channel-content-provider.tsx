"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Channel, Member } from "@prisma/client";

const ChannelContent = dynamic(
  () => import("@/components/channel/channel-content"),
  { 
    loading: () => <div className="flex-1">Loading channel...</div>,
    ssr: false
  }
);

interface ChannelContentProviderProps {
    channel: Channel;
    member: Member;
}

export function ChannelContentProvider({ channel, member }: ChannelContentProviderProps) {
    return (
        <Suspense fallback={<div className="flex-1">Loading channel content...</div>}>
            <ChannelContent 
                channel={channel}
                member={member}
            />
        </Suspense>
    );
} 