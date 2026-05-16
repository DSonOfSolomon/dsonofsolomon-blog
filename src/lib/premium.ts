import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getCurrentSubscriber() {
  const cookieStore = await cookies();
  const email = cookieStore.get("subscriber_email")?.value?.toLowerCase();

  if (!email) {
    return null;
  }

  return prisma.subscriber.findFirst({
    where: {
      email,
    },
  });
}

export async function isPremiumSubscriber() {
  const subscriber = await getCurrentSubscriber();
  return subscriber?.tier === "premium";
}
