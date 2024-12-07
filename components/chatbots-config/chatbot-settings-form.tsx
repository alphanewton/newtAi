"use client";
import React from "react";
import FormGenerator from "../forms";
import { useSettings } from "@/hooks/use-chatbot-config";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import CodeSnippet from "./code-snippet";
import { Separator } from "../ui/separator";
import { Crown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader } from "../loader";

const WelcomeMessage = dynamic(() =>
  import("./greetings-message").then((props) => props.default)
);

type Props = {
  id: string;
  name: string;
  chatbot: {
    id: string;
    welcomeMessage: string | null;
  } | null;
};

export const SettingsForm = ({ id, name, chatbot }: Props) => {
  const {
    register,
    onUpdateSettings,
    onDeleteDomain,
    errors,
    loading,
    deleting,
  } = useSettings(id);

  console.log(chatbot);
  return (
    <div>
      <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold">Domain Settings</h2>
          <Separator orientation="horizontal" />
          <DomainUpdate name={name} register={register} errors={errors} />
          <CodeSnippet id={id} />
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex gap-4 items-center">
              <h2 className="font-bold text-3xl">Chatbot Settings</h2>
              <div className="flex gap-1 bg-muted rounded-full px-3 py-1 text-xs items-center font-bold">
                <Crown />
                Premium
              </div>
            </div>
            <Separator orientation="horizontal" />
            <div className="grid md:grid-cols-2">
              <div className="col-span-1 flex flex-col justify-center items-center gap-5 order-last md:order-first">
                <WelcomeMessage
                  message={chatbot?.welcomeMessage!}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-1 relative">
                <Image
                  src="/bot-ui.png"
                  alt="bot ui"
                  className="sticky top-0"
                  width={530}
                  height={769}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              className="px-10 h-[50px]"
              variant="destructive"
              type="button"
              onClick={onDeleteDomain}
            >
              <Loader loading={deleting}>Delete Domain</Loader>
            </Button>
            <Button className="px-10 h-[50px]" type="submit">
              <Loader loading={loading}>Save</Loader>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

type DomainUpdateProps = {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const DomainUpdate = ({ name, register, errors }: DomainUpdateProps) => {
  return (
    <div className="flex gap-2 pt-5 items-end x-[400px]">
      <FormGenerator
        label="Domain Name"
        name="domain"
        register={register}
        errors={errors}
        type="text"
        inputType="input"
        placeholder={name}
      />
    </div>
  );
};
