"use client";

import { onGetAllAccountDomains } from "@/actions/settings";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {};

const TrainingPage = (props: Props) => {
  const [domains, setDomains] = useState<string[]>([]);

  // Fetch domains when the component mounts
  useEffect(() => {
    const getDomains = async () => {
      try {
        const response = await onGetAllAccountDomains();
        const domainNames = response?.domains.map((d: any) => d.name) || [];
        setDomains(domainNames);
      } catch (error) {
        console.error("Failed to fetch domains:", error);
      }
    };

    getDomains();
  }, []);

  return (
    <div>
      <div className="mb-12 text-center flex justify-around w-screen">
        {/* Settings Header */}
        <p className="text-4xl font-bold flex items-center gap-2">
          <Settings size={32} /> SETTINGS
        </p>

        {/* Dropdown to Select Domain */}
        <div className="flex justify-center max-w-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                Select Domain
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              {domains.length > 0 ? (
                domains.map((domain, index) => (
                  <DropdownMenuItem key={index}>
                    <span>{domain}</span>
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
    </div>
  );
};

export default TrainingPage;
