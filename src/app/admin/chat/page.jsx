"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "erkinboy24122006@gmail.com";

export default function AdminChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Проверяем, авторизован ли админ
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.email !== ADMIN_EMAIL) {
      router.push("/");
    }
  }, [session, status, router]);

  // Получаем список пользователей, отправивших сообщения
  const fetchUsers = async () => {
    const res = await fetch("/api/chat/users");
    if (res.ok) {
      setUsers(await res.json());
      if (!selectedUser && users.length) {
        setSelectedUser(users[0]);
      }
    }
  };

  // Получаем сообщения для выбранного пользователя
  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/chat?user=${encodeURIComponent(selectedUser)}`);
      if (res.ok) {
        setMessages(await res.json());
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Инициализация: список пользователей + сообщения
  useEffect(() => {
    fetchUsers();
  }, []);

  // Когда выбирают пользователя, или по интервалу — обновляем чат
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  // Скроллим вниз при получении новых сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Отправка сообщения от админа конкретному пользователю
  const sendAdminMessage = async () => {
    if (!input.trim() || !selectedUser) return;
    const newMsg = { sender: "admin", text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "admin",
          text: input,
          recipient: selectedUser,
        }),
      });
      fetchMessages();
    } catch (error) {
      console.error("Error sending admin message", error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendAdminMessage();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Админ - Чат</h1>
      {/* Селектор пользователя */}
      <div className="mb-4">
        <label className="mr-2">Выберите пользователя:</label>
        <select
          value={selectedUser || ""}
          onChange={e => setSelectedUser(e.target.value)}
          className="border rounded p-1"
        >
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>

      <div className="border p-4 rounded h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 flex ${msg.sender === 'admin' ? 'justify-start' : 'justify-end'}`}>
            <div className="flex flex-col">
              {/* Показываем, кто отправил сообщение */}
              <span className="text-xs text-gray-400 mb-1">
                {msg.sender === 'admin' ? 'Админ' : msg.sender}
              </span>
              <div className={`rounded p-2 max-w-[70%] ${msg.sender === 'admin' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
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
