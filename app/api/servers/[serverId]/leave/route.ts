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
                profileId:{
                    not:profile.id
                },
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            },
            data:{
                members:{
                    deleteMany:{
                        profileId:profile.id
                    }
                }
            }
        });
        return NextResponse.json(server);
    }catch(error){
        console.log("[SERVER_ID<LEAVE]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}