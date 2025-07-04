"use client";

import {useEffect, useState} from "react";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { VideoConference, LiveKitRoom } from '@livekit/components-react';
interface MediaRoomProps{
    chatId: string;
    video: boolean;
    audio: boolean;
};


const MediaRoom=({
    chatId,
    video,
    audio
}: MediaRoomProps)=>{
    const {user}=useUser();
    const [token,setToken]=useState("");
    useEffect(()=>{
        //import('@livekit/components-styles');
        if(!user?.firstName||!user.lastName) return;
        const name=`${user.firstName}${user.lastName}`;

        (async()=>{
            try{
                const resp=await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data=await resp.json();
                setToken(data.token);
            }catch(e){
                console.error(e);
            }
        })();

    },[user?.firstName,user?.lastName,chatId,user]);

    if(token===""){
        return(
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader 
                    className="h-7 w-7 text-zinc-500 animate-spin my-4"
                    size={32} 
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            dark-lt-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}
export default MediaRoom;