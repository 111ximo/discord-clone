"use client";

import { ChannelType } from "@prisma/client";
import { Member } from "@prisma/client";
import { Channel } from "@prisma/client";
import { Suspense } from 'react';

import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { MediaRoomProvider } from "@/components/providers/media-room-provider";

interface ChannelContentProps {
  channel: Channel;
  member: Member;
}

export default function ChannelContent({ channel, member }: ChannelContentProps) {
  return (
    <>
      {channel.type === ChannelType.TEXT && (
        <Suspense fallback={<div>Loading text channel...</div>}>
          <ChatMessages 
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput 
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </Suspense>
      )}
      {channel.type === ChannelType.AUDIO && (
        <Suspense fallback={<div>Loading audio channel...</div>}>
          <MediaRoomProvider 
            chatId={channel.id}
            video={false}
            audio={true}
          />
        </Suspense>
      )}
      {channel.type === ChannelType.VIDEO && (
        <Suspense fallback={<div>Loading video channel...</div>}>
          <MediaRoomProvider 
            chatId={channel.id}
            video={true}
            audio={true}
          />
        </Suspense>
      )}
    </>
  );
} 