"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function WorkoutsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Загрузка...</p>;
  if (!session)
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="mb-4">Для просмотра тренировок необходимо войти в систему.</p>
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
          Войти
        </Link>
      </div>
    );

  // Пример статических данных тренировок
  const workouts = [
    { id: 1, title: "Кардио тренировка", duration: 30 },
    { id: 2, title: "Силовая тренировка", duration: 45 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ваши тренировки</h1>
      <ul className="space-y-4">
        {workouts.map((w) => (
          <li key={w.id} className="border p-4 rounded hover:shadow">
            <Link href={`/workouts/${w.id}`}>
              <div>
                <h2 className="text-xl font-semibold">{w.title}</h2>
                <p>Длительность: {w.duration} минут</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
