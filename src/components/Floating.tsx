"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FaPaperPlane } from "react-icons/fa";

export default function DynamicChatForm() {
  const SUPPORT_EMAIL = "erkinboy241222006@gmail.com";
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; recipient: string; text: string }>>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Хуки всегда до ранних return
  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || userEmail.split("@")[0];
  const isSupport = userEmail === SUPPORT_EMAIL;

  // Fetch: если поддержка — без фильтра, иначе только свои
  const fetchMessages = async () => {
    try {
      const url = isSupport 
        ? "/api/chat"  // админ получает все
        : `/api/chat?user=${encodeURIComponent(userEmail)}`;  // пользователь — свои
      const res = await fetch(url);
      if (res.ok) {
        setMessages(await res.json());
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [isSupport, userEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (status === "loading") return null;
  if (!session?.user) {
    return (
      <div className="fixed bottom-20 right-5 bg-white rounded-lg shadow-xl p-4 z-50 w-80">
        <p className="text-center text-gray-600">
          пожалуйста, <a href="/api/auth/signin" className="text-blue-600 underline">войдите</a> для чата
        </p>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");

    // определяем получателя: если поддержка, то рассылка всем, иначе — admin
    const recipient = isSupport ? "" : "admin";

    setMessages(prev => [...prev, { sender: userEmail, recipient, text }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: userEmail, recipient, text }),
      });
      if (!res.ok) console.error("Error sending message");
      else fetchMessages();
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const toggleChat = () => setIsOpen(prev => !prev);

  const avatar = (name: string) => {
    const initials = name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
    return (
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-200 text-blue-800 font-semibold">
        {initials}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full p-4 shadow-lg flex items-center z-50 hover:scale-105 transition-transform"
      >
        <span className="mr-2">💬</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white rounded-lg shadow-xl flex flex-col z-50 w-80 max-h-[420px]">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            {avatar(isSupport ? "Поддержка" : userName)}
            <h2 className="ml-3 text-lg font-semibold text-gray-800">
              Чат с {isSupport ? "пользователями" : "Поддержкой"}
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, idx) => {
              const senderIsSupport = msg.sender === SUPPORT_EMAIL;
              const isOwn = msg.sender === userEmail;
              // отображаем имя вместо email
              const displayName = senderIsSupport ? "Поддержка" : msg.sender.split("@")[0];
              return (
                <div
                  key={idx}
                  className={`flex items-start ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  {!isOwn && <div className="mr-2">{avatar(displayName)}</div>}
                  <div className="max-w-[70%]">
                    <div className="text-xs text-gray-500 mb-1">
                      {displayName}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg break-words shadow-sm ${
                        senderIsSupport
                          ? 'bg-green-100 text-gray-800 rounded-bl-none'
                          : 'bg-blue-600 text-white rounded-br-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {isOwn && <div className="ml-2">{avatar(userName)}</div>}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Напишите сообщение..."
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="ml-2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
