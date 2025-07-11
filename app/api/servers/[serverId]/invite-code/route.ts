import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
){ 
    try{
        
        const profile=await currentProfile();
        
        if(!profile){
            return new NextResponse("Unauthorized",{status:401});
        }

        if(!params.serverId){
            return new NextResponse("Server not found",{status:400});
        }

        const {serverId}=await params;

        const server=await db.server.update({
            where:{
                id:serverId,
                profileId:profile.id,
            },
            data:{
                inviteCode:uuidv4(),
            }
        });
        console.log("Updated server:", server);
        return NextResponse.json(server);
    }catch(error){
        console.log("[SERVER_ID]",error);
        return new NextResponse("Internet Error",{status:500});
    }
}