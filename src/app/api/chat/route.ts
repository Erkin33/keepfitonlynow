import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("user");
  if (!userEmail) {
    return NextResponse.json({ error: "Missing user query" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const messages = await prisma.chatMessage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const { sender, text, recipient } = await request.json();
    if (!sender || !text || !recipient) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: recipient } });
    if (!user) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
    }

    const newMsg = await prisma.chatMessage.create({
      data: {
        sender,
        text,
        user: { connect: { id: user.id } },
      },
    });

    return NextResponse.json(newMsg, { status: 201 });
  } catch (error) {
    console.error("Ошибка в POST /api/chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
