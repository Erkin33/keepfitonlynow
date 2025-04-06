import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // Получаем все сообщения в порядке возрастания даты
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Теперь ожидаем дополнительные поля: senderName и senderEmail
    const { sender, text, senderName, senderEmail } = await request.json();
    if (!sender || !text) {
      return NextResponse.json({ error: "Missing sender or text" }, { status: 400 });
    }
    
    // Сохраняем сообщение в базе
    const newMessage = await prisma.chatMessage.create({
      data: { sender, text },
    });

    // Отправляем сообщение в Telegram с информацией об отправителе
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      const telegramText = `Новое сообщение от ${senderName || sender} (${senderEmail || "не указан email"}):\n${text}`;
      
      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
        }),
      });
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Ошибка отправки в Телеграм:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
