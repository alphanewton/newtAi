import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import HelpDesk from "./help-desk";
import FilterQuestions from "./filter-questions";

type Props = {
  id: string;
};

const HELP_DESK_TABS_MENU = [
  {
    label: "Help Desk",
  },
  {
    label: "Lead Generation",
  },
];

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl">Bot Training</h2>
        <p className="text-sm font-light">
          Set FAQ questions, create questions for capturing lead information and
          train your bot to act the way you want it to.
        </p>
        <Tabs className="w-full" defaultValue={HELP_DESK_TABS_MENU[0].label}>
          <TabsList className="m-5">
            {HELP_DESK_TABS_MENU.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.label}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent className="w-full lg:min-w-[1200px]" value="Help Desk">
            <HelpDesk id={id} />
          </TabsContent>
          <TabsContent
            className="w-full lg:min-w-[1200px]"
            value="Lead Generation"
          >
            <FilterQuestions id={id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BotTrainingForm;
