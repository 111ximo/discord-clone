"use client";

import { ServerWithMemberWithProfiles } from "@/type";
import { MemberRole } from "@prisma/client";
import { 
    ChevronDown, 
    LogOut, 
    PlusCircle, 
    Settings, 
    Trash, 
    UserPlus, 
    Users
} from "lucide-react";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger,
    DropdownMenuItem, 
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { useState } from "react";

interface ServerHeaderProps{
    server:ServerWithMemberWithProfiles;
    role?:MemberRole;
};

export const ServerHeader=({
    server,
    role,
}:ServerHeaderProps)=>{
    const {onOpen}=useModal();

    const [isOpen, setIsOpen] = useState(false); // 添加状态管理

    const isAdmin=role===MemberRole.ADMIN;
    const isModerator=isAdmin||role===MemberRole.MODERATOR;

    // 添加 handleModalOpen 函数，解决状态混乱问题
    const handleModalOpen = (type: ModalType, server?: ServerWithMemberWithProfiles) => {
        setIsOpen(false);
        onOpen(type, { server }); 
    };


    return (


        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:border-zinc-700/10 dark:hover:bg-zinc-700/50 transition"    
                >
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
            >
                {isModerator&&(
                    <DropdownMenuItem
                    onClick={()=>handleModalOpen("invite",server)}
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Invite people
                        <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isAdmin&&(
                    <DropdownMenuItem
                    onClick={()=>handleModalOpen("editServer",server)}
                    className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isAdmin&&(
                    <DropdownMenuItem
                    onClick={()=>handleModalOpen("members",server)}
                    className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Manage Members
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isModerator&&(
                    <DropdownMenuItem
                    onClick={()=>handleModalOpen("createChannel")}
                    className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isModerator&&(
                    <DropdownMenuSeparator />
                )}
                {isAdmin&&(
                    <DropdownMenuItem
                    onClick={()=>handleModalOpen("deleteServer",server)}
                    className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Delete Server
                        <Trash className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {!isAdmin&&(
                    <DropdownMenuItem
                    onClick={()=>handleModalOpen("leaveServer",server)}
                    className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Leave Server
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
