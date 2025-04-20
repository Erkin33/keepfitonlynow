"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FaPaperPlane } from "react-icons/fa";

export default function DynamicChatForm() {
  const SUPPORT_EMAIL = "erkinboy24122006@gmail.com";
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || userEmail.split("@")[0];
  const isSupport = userEmail === SUPPORT_EMAIL;

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat?user=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setMessages(data || []);
    } catch (error) {
      console.error("Ошибка загрузки сообщений:", error);
    }
  };

  useEffect(() => {
    if (!userEmail) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");

    setMessages((prev) => [...prev, { sender: userEmail, text }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: userEmail,
          recipient: isSupport ? "" : SUPPORT_EMAIL,
          text,
        }),
      });

      if (!res.ok) {
        console.error("Ошибка при отправке сообщения");
      } else {
        fetchMessages();
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const avatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return (
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-200 text-blue-800 font-semibold">
        {initials}
      </div>
    );
  };

  if (status === "loading") return null;

  if (!session?.user) {
    return (
      <div className="fixed bottom-20 right-5 bg-white rounded-lg shadow-xl p-4 z-50 w-80">
        <p className="text-center text-gray-600">
          Пожалуйста, <a href="/api/auth/signin" className="text-blue-600 underline">войдите</a> для чата
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50 hover:scale-105 transition"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-xl flex flex-col z-50 max-h-[420px]">
          <div className="flex items-center p-4 border-b border-gray-200">
            {avatar(userName)}
            <h2 className="ml-3 text-lg font-semibold text-gray-800">
              Чат с Поддержкой
            </h2>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, idx) => {
              const isOwn = msg.sender === userEmail;
              return (
                <div key={idx} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[70%]">
                    <div className={`px-4 py-2 rounded-lg shadow-sm break-words ${
                      isOwn ? "bg-blue-600 text-white rounded-br-none" : "bg-green-100 text-gray-800 rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите сообщение..."
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="ml-2 p-2 rounded-full bg-blue-600 text-white">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
