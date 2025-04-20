// src/app/api/telegram/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Здесь можно реализовать отправку уведомлений в Telegram через Bot API
  return NextResponse.json({ message: "Telegram API не реализован" });
}
