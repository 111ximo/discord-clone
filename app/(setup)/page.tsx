import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
//use "npx prisma studio" to see the data in the database"
const SetUpPage = async () => {

    const profile = await initialProfile();
    //console.log(profile);
    console.log(db.server.findFirst)
    const server=await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    });

    //console.log(server);
    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return <InitialModal />
}
 
export default SetUpPage;


