"use client";

import MediaRoom from '@/components/media-room';
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