"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "erkinboy24122006@gmail.com";

export default function AdminChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // 1) Защита роута
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.email !== ADMIN_EMAIL) {
      router.push("/");
    }
  }, [session, status, router]);

  // 2) Получаем юзеров
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/chat/users");
        const list = await res.json();
        setUsers(list);
        if (list.length > 0) setSelectedUser(list[0].email); // исправлено
      } catch (e) {
        console.error("Ошибка fetchUsers:", e);
      }
    }
    loadUsers();
  }, []);

  // 3) Получаем сообщения при смене selectedUser (и раз в 5 сек)
  useEffect(() => {
    if (!selectedUser) return;
    let inFlight = false;
    async function loadMessages() {
      if (inFlight) return;
      inFlight = true;
      try {
        const res = await fetch(
          `/api/chat?user=${encodeURIComponent(selectedUser)}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (e) {
        console.error(e);
      } finally {
        inFlight = false;
      }
    }
    loadMessages();
    const timer = setInterval(loadMessages, 5000);
    return () => clearInterval(timer);
  }, [selectedUser]);

  // 4) Скролл вниз
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 5) Отправка
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;

    // оптимистичный апдейт
    setMessages((m) => [...m, { sender: "admin", text: input }]);
    const text = input;
    setInput("");

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "admin",
          recipient: selectedUser,
          text,
        }),
      });
      // подгрузить с сервера заново
      const res = await fetch(
        `/api/chat?user=${encodeURIComponent(selectedUser)}`
      );
      setMessages(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Админ — Чат</h1>

      <div className="mb-4">
        <label className="mr-2">Пользователь:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border rounded p-1"
        >
          {users.map((u) => (
            <option key={u.id} value={u.email}>
              {u.name ?? u.email}
            </option>
          ))}
        </select>
      </div>

      <div className="border p-4 rounded h-80 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              m.sender === "admin" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">
                {m.sender === "admin" ? "Админ" : m.sender}
              </span>
              <div
                className={`rounded p-2 max-w-[70%] ${
                  m.sender === "admin"
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          className="flex-grow border rounded p-2"
          placeholder="Ваше сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Отправить
        </button>
      </form>
    </div>
  );
}
