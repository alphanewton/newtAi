import { onGetAllAccountDomains } from "@/actions/chatbot-config";
import ConversationMenu from "@/components/conversations";
import Messenger from "@/components/conversations/messenger";
import { Separator } from "@/components/ui/separator";
import { Inbox } from "lucide-react";
import React from "react";

type Props = {};

const ConversationsPage = async (props: Props) => {
  const domains = await onGetAllAccountDomains();

  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domains?.domains} />
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <Messenger />
      </div>
    </div>
  );
};

export default ConversationsPage;
