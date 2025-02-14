import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChannelContentProvider } from "@/components/providers/channel-content-provider";

interface ChannelPageProps {
    params: Promise<{
        serverId: string;
        channelId: string;
    }>;
}

const ChannelIdPage = async ({
    params
}: ChannelPageProps) => {
    const profile = await currentProfile();
    const { serverId, channelId } = await params;

    if (!profile) {
        return redirect("/");
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId
        }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id
        }
    });

    if(!channel || !member){
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <ChannelContentProvider 
                channel={channel}
                member={member}
            />
        </div>
    );
}
 
export default ChannelIdPage;