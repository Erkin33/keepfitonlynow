"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  // При изменении сессии инициализируем данные пользователя
  useEffect(() => {
    if (session && session.user) {
      setUserData(session.user);
      setFormData({
        name: session.user.name || "",
        email: session.user.email,
      });
    }
  }, [session]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (!session)
    return (
      <p>
        Пожалуйста,{" "}
        <a href="/login" className="text-blue-600 underline">
          войдите
        </a>{" "}
        для просмотра профиля.
      </p>
    );
  if (!userData) return <p>Загрузка данных профиля...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      
      {message && <p className="mb-4 text-green-600">{message}</p>}
      
      {editMode ? (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="p-2 border rounded w-full"
            placeholder="Имя"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-2 border rounded w-full"
            placeholder="Email"
          />
          <div className="flex gap-4">
            <button
              onClick={async () => {
                const res = await fetch("/api/user", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
                if (res.ok) {
                  const updatedUser = await res.json();
                  setUserData(updatedUser);
                  setMessage("Информация обновлена");
                  setEditMode(false);
                } else {
                  setMessage("Ошибка обновления");
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Сохранить
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p>
            <strong>Имя:</strong> {userData?.name || "Не указано"}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
          <p>
            <strong>Монеты:</strong>{" "}
            {userData?.coins !== undefined ? userData.coins : 0}
          </p>
          <div className="mt-4">
            <p>
              За каждую завершённую тренировку (один раз в день для каждого вида
              тренировки) начисляется 5 монет.
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Редактировать профиль
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hover:underline focus:outline-none"
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
