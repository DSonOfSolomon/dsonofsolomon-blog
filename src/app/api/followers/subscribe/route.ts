import { NextRequest, NextResponse } from "next/server";
import { getPrimaryCreator } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type PushSubscriptionPayload = {
  endpoint: string;
  keys?: {
    p256dh?: string;
    auth?: string;
  };
};

export async function POST(request: NextRequest) {
  const creator = await getPrimaryCreator();
  const body = (await request.json()) as PushSubscriptionPayload;
  const endpoint = body.endpoint?.trim();
  const p256dh = body.keys?.p256dh?.trim();
  const auth = body.keys?.auth?.trim();

  if (!endpoint || !p256dh || !auth) {
    return NextResponse.json({ error: "Invalid subscription payload." }, { status: 400 });
  }

  await prisma.follower.upsert({
    where: { endpoint },
    update: {
      p256dh,
      auth,
      status: "active",
      userAgent: request.headers.get("user-agent"),
    },
    create: {
      endpoint,
      p256dh,
      auth,
      status: "active",
      userAgent: request.headers.get("user-agent"),
      creatorId: creator.id,
    },
  });

  return NextResponse.json({ ok: true });
}
