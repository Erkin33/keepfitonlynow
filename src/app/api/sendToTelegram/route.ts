import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, senderName, senderEmail } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Telegram credentials not provided" },
        { status: 500 }
      );
    }

    // Формируем сообщение, включающее данные отправителя
    const text = `Новое сообщение с сайта:\n\nОтправитель: ${senderName ? senderName : "Не указан"}\nEmail: ${senderEmail ? senderEmail : "Не указан"}\n\nСообщение:\n${message}`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!telegramResponse.ok) {
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Ошибка отправки в Телеграм:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
