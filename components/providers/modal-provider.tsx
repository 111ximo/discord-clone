"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted,setIsMounted]=useState(false);
    const {isOpen,onClose,type}=useModal();
    console.log("Modal state:", { isOpen, type });
    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

    return (
        <>
        <CreateServerModal />
        </>
    );
}