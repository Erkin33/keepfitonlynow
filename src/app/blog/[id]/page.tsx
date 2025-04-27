// src/app/workouts/[id]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { use } from "react";

type Workout = {
  id: number;
  title: string;
  description: string;
};

const workouts: Workout[] = [
  {
    id: 1,
    title: "Первая тренировка",
    description: "<p>Описание первой тренировки.</p>",
  },
  {
    id: 2,
    title: "Вторая тренировка",
    description: "<p>Описание второй тренировки.</p>",
  },
];

// 1. Синхронно генерируем все id для SSG
export function generateStaticParams(): { id: string }[] {
  return workouts.map((w) => ({ id: w.id.toString() }));
}

// 2. Асинхронно формируем метаданные, дождавшись params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const workout = workouts.find((w) => w.id.toString() === id);
  return workout
    ? { title: workout.title }
    : { title: "Тренировка не найдена" };
}

// 3. Основной компонент — оба пропса (params и searchParams) приходят как Promise
export default function WorkoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // React 19-хук use() “читает” Promise и возвращает результат
  const { id } = use(params);
  // при желании можно достать и searchParams:
  // const qs = use(searchParams);

  const workout = workouts.find((w) => w.id.toString() === id);
  if (!workout) notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: workout.description }}
      />
    </div>
  );
}
