"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onIntegrateDomain = async (domain: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
      },
    });
    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });
    if (!domainExists) {
      if (subscription?._count && subscription._count.domains < 5) {
        const newDomain = await client.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                chatBot: {
                  create: {
                    welcomeMessage:
                      "Hey there, have a question? NewtAi is here!",
                  },
                },
              },
            },
          },
        });

        if (newDomain) {
          return { status: 200, message: "Domain created!" };
        }
      }
    }

    return {
      status: 400,
      message: "You've reached the maximum number of domains(5)",
    };
  } catch (err) {
    return {
      status: 400,
      message: err,
    };
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;
  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteDomainAction = async (domain: string) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized access" };

  try {
    const domainExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    if (!domainExists) {
      return { status: 404, message: "Domain not found" };
    }

    await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        domains: {
          deleteMany: {
            name: domain,
          },
        },
      },
    });

    return { status: 200, message: "Domain deleted successfully" };
  } catch (error) {
    console.error("Error deleting domain:", error);
    return {
      status: 500,
      message: "An error occurred while deleting the domain",
    };
  }
};
