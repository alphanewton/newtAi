"use client";
import { useConversation } from "@/hooks/use-conversation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  StarIcon,
  TimerIcon,
  MailIcon,
  MailQuestion,
  Inbox,
} from "lucide-react";
import ConversationSearch from "./search";
import { Loader } from "../loader";
import { CardDescription } from "../ui/card";
import ChatCard from "./chat-card";
import { Separator } from "../ui/separator";

type Props = {
  domains?:
    | {
        name: string;
        id: string;
      }[]
    | undefined;
};

const TABS_MENU = [
  {
    label: "unread",
    icon: <MailQuestion />,
  },
  {
    label: "all",
    icon: <MailIcon />,
  },
  {
    label: "expired",
    icon: <TimerIcon />,
  },
  {
    label: "starred",
    icon: <StarIcon />,
  },
];

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation();
  return (
    <div className="p-3 flex flex-col items-center">
      <p className="text-xl font-bold flex items-center gap-2">
        <Inbox size={32} /> Conversations
      </p>
      <Tabs className="w-full" defaultValue={TABS_MENU[0].label}>
        <TabsList className="m-5">
          {TABS_MENU.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              disabled={tab.label !== "unread"}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="unread">
          <ConversationSearch register={register} domains={domains} />
          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription>No chats for this domain</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        {/* <TabsContent value="all">
          <Separator orientation="horizontal" className="mt-5" />
          all
        </TabsContent>
        <TabsContent value="expired">
          <Separator orientation="horizontal" className="mt-5" />
          expired
        </TabsContent>
        <TabsContent value="starred">
          <Separator orientation="horizontal" className="mt-5" />
          starred
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default ConversationMenu;
