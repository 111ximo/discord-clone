"use client";

import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { time } from "console";
import Image from "next/image";

interface ChatItemProps{
    id:string;
    content:string;
    member:Member&{
        profile:Profile;
    };
    timestamp:string;
    fileUrl:string|null;
    deleted:boolean;
    currentMember:Member;
    isUpdated:boolean;
    socketUrl:string;
    socketQuery:Record<string,string>;
}

const roleIconMap={
    "GUEST":null,
    "ADMIN":<ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>,
    "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>
}

export const ChatItem=({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery
}:ChatItemProps)=>{
    let fileType: string | undefined = undefined;
    console.log("URL 地址",fileUrl);

    if(fileUrl){
        const urlObj = new URL(fileUrl);
        fileType = urlObj.searchParams.get("ext") ?? undefined;
    }


    const isAdmin=currentMember.role===MemberRole.ADMIN;
    const isModerator=currentMember.role===MemberRole.MODERATOR;
    const isOwner=currentMember.id===member.id;
    const canDeleteMessage=!deleted&&(isAdmin||isModerator||isOwner);
    const canEditMessage=!deleted&&isOwner&&!fileUrl;
    const isPdf=fileType==="pdf"&&fileUrl;
    const isImage=!isPdf&&fileUrl;

    return(
        <div className="relative group flex items-center hover:bg-blcak/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl}/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold tetx-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage&&(
                        <a 
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image 
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}
                    {isPdf&&(
                        <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10 '>
                        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                        <a 
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
                        >
                            PDF FILE
                        </a>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}