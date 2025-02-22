import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({children}:{children:React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="transition-transform duration-300 transform md:translate-x-0 -translate-x-full fixed inset-y-0 z-30 flex-col">
                <NavigationSidebar />
            </div>
            <main className="transition-all duration-300 pl-0 md:pl-[72px] h-full">
                {children}
            </main>
        </div>

     );
}
 
export default MainLayout;