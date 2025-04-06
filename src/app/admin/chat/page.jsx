"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Проверяем, является ли текущий пользователь администратором
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.email !== "erkinboy24122006@gmail.com") {
      // Если пользователь не админ, перенаправляем на главную
      router.push("/");
    }
  }, [session, status, router]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendAdminMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: "admin", text: input };
    // Обновляем UI оптимистично
    setMessages((prev) => [...prev, newMsg]);
    const currentMsg = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "admin", text: currentMsg }),
      });
      if (!res.ok) {
        console.error("Error sending admin message");
      }
      fetchMessages();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendAdminMessage();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Админ - Чат</h1>
      <div className="border p-4 rounded h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.sender === "admin" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`rounded p-2 max-w-[70%] ${
                msg.sender === "admin"
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ответьте..."
          className="flex-grow border rounded p-2"
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Отправить
        </button>
      </form>
    </div>
  );
}
