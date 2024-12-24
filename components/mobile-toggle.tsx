import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/server/server-sidebar";

export const MobileToggle=({
    serverId
}:{
    serverId:string;
})=>{
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0 w-[350px]">
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                
                <div className="w-60">
                    <ServerSidebar serverId={serverId}/>
                </div>
            </SheetContent>
        </Sheet>
    ) 
}