"use client";

import dynamic from 'next/dynamic';

const MediaRoom = dynamic(
  () => import("@/components/media-room"),
  {
    loading: () => <div className="flex items-center justify-center h-full">Loading media...</div>,
    ssr: false
  }
);

interface MediaRoomProviderProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoomProvider = ({
    chatId,
    video,
    audio
}: MediaRoomProviderProps) => {
    return (
        <MediaRoom 
            chatId={chatId}
            video={video}
            audio={audio}
        />
    );
}; 