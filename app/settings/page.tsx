"use client";
import FormGenerator from "@/components/forms";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useDomain } from "@/hooks/use-domain";
import { Settings, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  onDeleteDomainAction,
  onGetAllAccountDomains,
} from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";

type Props = {};

const SettingsPage = (props: Props) => {
  const { register, onAddDomain, loading, errors } = useDomain();
  const [domains, setDomains] = useState<any>([]);
  const [loading2, setLoading2] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getDomains = async () =>
      await onGetAllAccountDomains().then((e: any) => {
        const arr = e?.domains.map((d: any) => d.name) || [];
        setDomains(arr);
        console.log(arr);
      });
    getDomains();
  }, [loading, loading2]); // <-- Use an empty dependency array to ensure this runs only once

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col justify-center">
        {/* Settings Header */}
        <div className="mb-12 text-center">
          <p className="text-4xl font-bold flex items-center gap-2">
            <Settings size={32} /> SETTINGS
          </p>
        </div>

        <div className="flex justify-around">
          {/* Card for Adding a Domain */}
          <Card className="w-96 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Add Domain</CardTitle>
              <CardDescription>
                Add your business domain to integrate your chatbot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Loader loading={loading}>
                <form className="flex flex-col gap-3" onSubmit={onAddDomain}>
                  <FormGenerator
                    inputType="input"
                    register={register}
                    label="Domain"
                    name="domain"
                    errors={errors}
                    placeholder="mydomain.com"
                    type="text"
                  />
                  <Button type="submit" className="w-full">
                    Add Domain
                  </Button>
                </form>
              </Loader>
            </CardContent>
          </Card>

          {/* Card for Deleting a Domain */}
          <Card className="w-96 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Manage Domains</CardTitle>
              <CardDescription>
                View and delete your business domains.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Loader loading={loading2}>
                <div className="flex flex-col gap-3">
                  {domains && domains.length > 0 ? (
                    domains.map((domain: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border p-2 rounded-md"
                      >
                        <p>{domain}</p>
                        <Trash2
                          size={20}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={async () => {
                            setLoading2(true);
                            try {
                              const response = await onDeleteDomainAction(
                                domain
                              );
                              toast({
                                title:
                                  response.status === 200 ? "Success" : "Error",
                                description: response.message,
                              });
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to delete domain.",
                              });
                            }
                            setLoading2(false);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      No domains available. Add a domain to get started.
                    </p>
                  )}
                </div>
              </Loader>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
