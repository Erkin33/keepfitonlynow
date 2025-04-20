"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function DynamicChatForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { data: session } = useSession();

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

  // Периодически получаем новые сообщения (например, каждые 5 секунд)
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const sender = session?.user ? "user" : "anonymous";
    const userMessage = { sender, text: input };

    // Обновляем UI оптимистично
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, text: currentMessage }),
      });
      if (!res.ok) {
        console.error("Error sending message");
      }
      // Обновляем список сообщений после отправки
      fetchMessages();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl px-4 py-3 shadow-lg flex items-center z-50 hover:opacity-90 transition"
      >
        <span className="mr-2">💬</span>
        <span>Есть вопросы? Напишите нам!</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white rounded-lg shadow-xl flex flex-col z-50 w-80 max-h-[400px]">
          <div className="p-4 border-b border-gray-200 flex-grow overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : msg.sender === "admin"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите сообщение..."
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            />
          </form>
        </div>
      )}
    </>
  );
}
