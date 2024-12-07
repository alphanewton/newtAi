"use client";
import { onGetAllAccountDomains } from "@/actions/chatbot-config";
import BotTrainingForm from "@/components/chatbots-config/bot-training";
import { SettingsForm } from "@/components/chatbots-config/chatbot-settings-form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const TrainingPage = (props: Props) => {
  const [domains, setDomains] = useState<any[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const router = useRouter();

  // Fetch domains when the component mounts
  useEffect(() => {
    const getDomains = async () => {
      try {
        const response = await onGetAllAccountDomains();
        if (response?.domains) {
          setDomains(response?.domains);
          setSelectedDomain(response?.domains[0]);
          console.log(response?.domains[0]);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch domains:", error);
      }
    };

    getDomains();
  }, []);

  const handleDomainChange = (domain: any) => {
    setSelectedDomain(domain);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mb-3 text-center flex justify-around w-screen">
        {/* Settings Header */}
        <p className="text-4xl font-bold flex flex-col items-center gap-2">
          <Bot size={32} /> Chatbot Configurations
          <div className="mb-10 ml-7 text-slate-500 text-sm">
            Train your chatbot to do and what you want it to do, lead
            generation, enter sales questions, and modify domain settings.
          </div>
        </p>

        {/* Dropdown to Select Domain */}
        <div className="flex justify-center min-w-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                {selectedDomain?.name}
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              {domains.length > 0 ? (
                domains.map((domain, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleDomainChange(domain)}
                  >
                    <span>{domain.name}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>
                  <span>No domains available</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-y-auto w-full chat-window flex-1 px-7">
        <BotTrainingForm
          key={`training-${refreshKey}`}
          id={selectedDomain?.id}
        />

        <SettingsForm
          key={`settings-${refreshKey}`}
          id={selectedDomain?.id}
          name={selectedDomain?.name}
          chatbot={selectedDomain?.chatbot}
        />
      </div>
    </div>
  );
};

export default TrainingPage;
