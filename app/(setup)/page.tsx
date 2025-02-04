import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

import dynamic from "next/dynamic";

const InitialModal = dynamic(() => import("@/components/modals/initial-modal").then(mod => mod.InitialModal), { loading: () => <div>Loading...</div> } );
  
//use "npx prisma studio" to see the data in the database"
const SetUpPage = async () => {

    const profile = await initialProfile();
    //console.log(profile);
    const server=await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    });

    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return <InitialModal />
}
 
export default SetUpPage;


