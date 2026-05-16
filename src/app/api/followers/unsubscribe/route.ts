import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { endpoint?: string };
  const endpoint = body.endpoint?.trim();

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint is required." }, { status: 400 });
  }

  await prisma.follower.updateMany({
    where: { endpoint },
    data: {
      status: "inactive",
    },
  });

  return NextResponse.json({ ok: true });
}
