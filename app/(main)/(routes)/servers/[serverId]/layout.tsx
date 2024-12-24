import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
    children,
    params,
}:{
    children:React.ReactNode;
    params:{serverId:string};
})=>{
    const profile=await currentProfile();

    if(!profile){
        return <RedirectToSignIn />;
    }

    const server=await db.server.findFirst({
        where:{
            id:params.serverId,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    });

    if(!server){
        return redirect("/");
    }
    return (
        <div className="h-full">
            <div className="w-0 md:w-60 overflow-hidden fixed inset-y-0 z-20 flex-col ">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="pl-0 h-full md:pl-60">
                {children}
            </main>
            
        </div>
    );
}

export default ServerIdLayout;
