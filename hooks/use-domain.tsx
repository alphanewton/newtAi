"use client";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { useEffect, useState } from "react";
import {
  onDeleteDomainAction,
  onIntegrateDomain,
} from "@/actions/chatbot-config";

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
});

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(AddDomainSchema),
  });

  const pathname = usePathname();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split("/").pop());
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true);
    const domain = await onIntegrateDomain(values.domain);
    if (domain) {
      reset();
      setLoading(false);
      toast({
        title: domain.status == 200 ? "Success" : "Error",
        description: String(domain.message) || "",
      });

      router.refresh();
    }
  });

  return { register, onAddDomain, errors, loading, isDomain, setLoading };
};
