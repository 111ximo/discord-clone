"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Channel, Member } from "@prisma/client";
import ChannelContent from "@/components/channel/channel-content";
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