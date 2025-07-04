"use client";

import { Fragment,useRef,ElementRef, useMemo, useCallback } from "react";
import {format} from 'date-fns/format';
import { Loader, ServerCrash } from "lucide-react";
import { Member, Message,Profile } from "@prisma/client";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";

const DATE_FORMAT="d MM yyyy, HH:mm";

type MessageWithMemberWithProfile=Message&{
    member:Member&{
        profile:Profile
    }
}

interface ChatMessagesProps {
    name: string;
    member:Member;
    chatId: string;
    apiUrl: string;
    socketUrl:string;
    socketQuery:Record<string,string>;
    paramKey:"channelId"|"conversationId";
    paramValue:string;
    type:"channel"|"conversation";
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}:ChatMessagesProps) => {
    const queryKey = useMemo(() => `chat:${chatId}`, [chatId]);
    const addKey = useMemo(() => `chat:${chatId}:messages`, [chatId]);
    const updateKey = useMemo(() => `chat:${chatId}:messages:update`, [chatId]);

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    // 缓存查询参数
    const queryParams = useMemo(() => ({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    }), [queryKey, apiUrl, paramKey, paramValue]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    }=useChatQuery(queryParams)

    // 缓存 socket 参数
    const socketParams = useMemo(() => ({
        addKey: `chat:${chatId}:messages`,      // 检查这个格式
        updateKey: `chat:${chatId}:messages:update`,
        queryKey: `chat:${chatId}`
    }), [queryKey, addKey, updateKey]);

    // 缓存滚动参数
    const scrollParams = useMemo(() => ({
        chatRef,
        bottomRef,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        loadMore: fetchNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    }), [isFetchingNextPage, hasNextPage, fetchNextPage, data?.pages])

    useChatSocket(socketParams);
    useChatScroll(scrollParams)

    // 缓存加载更多的处理函数
    const handleLoadMore = useCallback(() => {
        fetchNextPage();
    }, [fetchNextPage]);

    const renderMessages = useMemo(() => (
        data?.pages?.map((group, i) => (
            <Fragment key={i}>
                {group.items.map((message: MessageWithMemberWithProfile) => (
                    <ChatItem
                        key={message.id}
                        id={message.id}
                        currentMember={member}
                        member={message.member}
                        content={message.content}
                        fileUrl={message.fileUrl}
                        deleted={message.deleted}
                        timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                        isUpdated={message.updatedAt !== message.createdAt}
                        socketUrl={socketUrl}
                        socketQuery={socketQuery}
                    />
                ))}
            </Fragment>
        ))
    ), [data?.pages, member, socketUrl, socketQuery]);

    if(status==="pending"){
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <Loader className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 my-4">
                    Loading messages...
                </p>
            </div>
        )
    }

    if(status==="error"){
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 my-4">
                    Something went wrong!
                </p>
            </div>
        )
    }

    return(
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage&&<div className="flex-1" />}
            {!hasNextPage&&(
                <ChatWelcome 
                    type={type}
                    name={name}
                />
            )}
            {hasNextPage&&(
                <div>
                    {isFetchingNextPage?(
                        <Loader className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ):(
                        <button
                            onClick={handleLoadMore}
                            className="text-xs text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 my-4 dark:hover:text-zinc-300 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
                <div className="flex flex-col-reverse mt-auto">
                    {renderMessages}
                </div>
            <div ref={bottomRef}/>
        </div>
    )
}