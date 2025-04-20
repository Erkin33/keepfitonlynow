import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const messages = await prisma.chatMessage.findMany({
    where: { userId: { not: null } },
    select: {
      user: { select: { id: true, email: true, name: true } },
    },
  });

  const usersMap = new Map<string, { id: number; email: string; name: string | null }>();
  for (const { user } of messages) {
    if (user && !usersMap.has(user.email)) {
      usersMap.set(user.email, user);
    }
  }

  return NextResponse.json(Array.from(usersMap.values()));
}
