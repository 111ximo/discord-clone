import { useSocket } from "@/components/providers/socket-provider";
import { Member, Profile, Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect} from "react";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    }
}

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: MessageWithMemberWithProfile) => {
            console.log("Received real message:", message.content);
            
            // 清理对应的乐观更新，并传入真实消息用于正确排序
            if ((window as any).removeOptimisticMessages) {
                (window as any).removeOptimisticMessages(message.content, message);
            } else {
                // 如果清理函数不可用，直接添加消息
                queryClient.setQueryData([queryKey], (oldData: any) => {
                    if (!oldData?.pages?.length) {
                        return {
                            pages: [{ items: [message], nextCursor: null }],
                            pageParams: [undefined]
                        };
                    }

                    // 检查是否已存在
                    const messageExists = oldData.pages[0].items.some((item: any) => 
                        item.id === message.id && !item.isOptimistic
                    );

                    if (messageExists) {
                        console.log("Message already exists, skipping");
                        return oldData;
                    }

                    const newPages = [...oldData.pages];
                    
                    // 移除相同内容的乐观更新
                    const filteredItems = newPages[0].items.filter(item => 
                        !(item.isOptimistic && item.content === message.content)
                    );

                    // 添加真实消息并按时间排序
                    const allItems = [message, ...filteredItems];
                    allItems.sort((a, b) => {
                        const timeA = a.optimisticTimestamp || new Date(a.createdAt).getTime();
                        const timeB = b.optimisticTimestamp || new Date(b.createdAt).getTime();
                        return timeB - timeA;
                    });

                    newPages[0] = {
                        ...newPages[0],
                        items: allItems
                    };

                    return { ...oldData, pages: newPages };
                });
            }
        };

        const handleUpdateMessage = (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData?.pages?.length) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        items: page.items.map((item: any) => 
                            item.id === message.id ? message : item
                        )
                    }))
                };
            });
        };

        socket.on(addKey, handleNewMessage);
        socket.on(updateKey, handleUpdateMessage);

        return () => {
            socket.off(addKey, handleNewMessage);
            socket.off(updateKey, handleUpdateMessage);
        };
    }, [socket, addKey, updateKey, queryKey, queryClient]);
};