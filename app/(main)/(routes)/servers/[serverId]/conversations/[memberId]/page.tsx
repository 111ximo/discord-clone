import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";

import dynamic from 'next/dynamic';

const MediaRoom = dynamic(
  () => import("@/components/media-room"),
  {
    loading: () => <div>Loading...</div>,
  }
);

interface MemberIdPageProps {
    params:{
        memberId: string;
        serverId: string;
    },
    searchParams:{
        video?: string;
    }
}

const MemberIdPage = async({
    params,
    searchParams
}:MemberIdPageProps) => {
    const profile =await currentProfile();

    if(!profile){
        return redirect("/");
    }

    const {serverId}= await params;

    const currentMember=await db.member.findFirst({
        where:{
            profileId:profile.id,
            serverId:serverId
        },
        include:{
            profile:true
        }
    })

    if(!currentMember){
        return redirect("/");
    }

    const conversation=await getOrCreateConversation(currentMember.id,params.memberId);

    if(!conversation){
        return redirect("/server/${params.serverId}");
    }

    const {memberOne,memberTwo}=conversation;

    const otherMember=profile.id===memberOne.profile.id?memberTwo:memberOne;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={params.serverId}
                type="conversation"
            />
            {!searchParams.video&&(
                <>
                    <ChatMessages 
                        member={currentMember}
                        name={otherMember.profile.name}
                        chatId={conversation.id}
                        type="conversation"
                        apiUrl="/api/direct-messages"
                        paramKey="conversationId"
                        paramValue={conversation.id}
                        socketUrl="/api/socket/direct-messages"
                        socketQuery={{
                            conversationId:conversation.id
                        }}
                    />
                    <ChatInput 
                        name={otherMember.profile.name}
                        type="conversation"
                        apiUrl="/api/socket/direct-messages"
                        query={{
                            conversationId:conversation.id
                        }}
                    />
                </>
            )}
            {searchParams.video&&(
                <MediaRoom 
                    chatId={conversation.id}
                    video={true}
                    audio={true}
                />
            )}
            
        </div>
     );
}
 
export default MemberIdPage;