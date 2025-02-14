import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>;
}

const ServerIdLayout = async ({
    children,
    params
}: LayoutProps) => {
    const profile = await currentProfile();
    const { serverId } = await params;  // 等待参数解析

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findFirst({
        where: {
            id: serverId,  // 使用解析后的 serverId
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        return redirect("/");
    }
    return (
        <div className="h-full">
            <div className="w-0 md:w-60 overflow-hidden fixed inset-y-0 z-20 flex-col">
                <ServerSidebar serverId={serverId}/>
            </div>
            <main className="pl-0 h-full md:pl-60">
                {children}
            </main>
            
        </div>
    );
}

export default ServerIdLayout;
