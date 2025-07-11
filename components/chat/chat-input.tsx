"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";

import{
    Form,
    FormControl,
    FormField,
    FormItem,
}from "@/components/ui/form";
import{Input}from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Plus} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
interface ChatInputProps{
    apiUrl:string;
    query:Record<string,any>;
    name:string;
    type:"conversation"|"channel";
    currentMember?: {
        id: string;
        profileId: string;
        serverId: string;
        createdAt: Date;
        updatedAt: Date;
        role: "ADMIN" | "MODERATOR" | "GUEST";
    };
}

const formSchema=z.object({
    content:z.string().min(1),
})

export const ChatInput=({
    apiUrl,
    query,
    name,
    type,
    currentMember
}:ChatInputProps)=>{
    const {onOpen}=useModal();
    const queryClient = useQueryClient();
    const optimisticMessagesRef = useRef(new Set<string>()); // 跟踪乐观消息ID

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            content:""
        }
    });

    const isLoading=form.formState.isSubmitting;

    const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        try {
            // 防止空内容提交
            if (!values.content.trim()) return;

            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            // 1. 立即清空输入框
            const messageContent = values.content.trim();
            form.reset();

            // 2. 创建临时消息ID和乐观消息 - 确保唯一性
            const now = Date.now();
            const randomSuffix = Math.random().toString(36).substr(2, 9);
            const tempId = `temp-${currentMember?.id}-${now}-${randomSuffix}`;
            const chatId = query.channelId || query.conversationId;
            const queryKey = `chat:${chatId}`;
            
            // 记录这个乐观消息
            optimisticMessagesRef.current.add(tempId);
            
            const optimisticMessage = {
                id: tempId,
                content: messageContent,
                fileUrl: null,
                deleted: false,
                createdAt: new Date(now).toISOString(),
                updatedAt: new Date(now).toISOString(),
                memberId: currentMember?.id || "temp-member-id",
                isOptimistic: true,
                optimisticTimestamp: now,
                member: {
                    id: currentMember?.id,
                    role: currentMember?.role,
                    profileId: currentMember?.profileId,
                    serverId: currentMember?.serverId,
                    profile:{
                        name:"you",
                        imageUrl:"https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ycUZQRGs5OVlRaTNyS3dUVm00aWVCenNrQlgiLCJyaWQiOiJ1c2VyXzJ5c1NpdXdpZ3g0Y0NDVEp3T2tYNjZlb0Y2MiIsImluaXRpYWxzIjoiWE0ifQ"
                    }
                },
                ...(type === "channel" && { channelId: query.channelId }),
                ...(type === "conversation" && { conversationId: query.conversationId })
            };

            // 3. 立即添加到缓存
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData?.pages?.length) {
                    return {
                        pages: [{ items: [optimisticMessage], nextCursor: null }],
                        pageParams: [undefined]
                    };
                }

                const newPages = [...oldData.pages];
                const allItems = [optimisticMessage, ...newPages[0].items];
                
                // 按时间戳排序，最新的在前面
                const sortedItems = allItems.sort((a, b) => {
                    const timeA = a.optimisticTimestamp || new Date(a.createdAt).getTime();
                    const timeB = b.optimisticTimestamp || new Date(b.createdAt).getTime();
                    return timeB - timeA;
                });

                newPages[0] = {
                    ...newPages[0],
                    items: sortedItems
                };

                return { ...oldData, pages: newPages };
            });

            // 4. 异步发送到服务器
            try {
                await axios.post(url, { content: messageContent });
                
            } catch (error) {                
                // 发送失败，立即移除乐观更新
                optimisticMessagesRef.current.delete(tempId);
                queryClient.setQueryData([queryKey], (oldData: any) => {
                    if (!oldData?.pages?.length) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page: any) => ({
                            ...page,
                            items: page.items.filter((item: any) => item.id !== tempId)
                        }))
                    };
                });
                
                // 恢复输入框内容
                form.setValue('content', messageContent);
            }

        } catch (error) {
            console.log(error);
        }
    }, [apiUrl, query, form, type, currentMember, queryClient]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name="content"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={()=>onOpen("messageFile",{apiUrl,query})}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]"/>
                                    </button>
                                    <Input
                                        placeholder={`Message ${type==="conversation"?"":"#"}${name}`.trim()}
                                        disabled={isLoading} 
                                        className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker 
                                            onChange={(emoji:string)=>field.onChange(`${field.value}${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                        )}
                />
            </form>
        </Form>
    )
}