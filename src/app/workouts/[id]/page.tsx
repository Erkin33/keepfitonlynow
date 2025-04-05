"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WorkoutTimer from "../../../components/WorkoutTimer";

export default function WorkoutDetail() {
  const params = useParams();
  const [workout, setWorkout] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Здесь можно сделать запрос к API для получения данных тренировки по ID
    // Для примера используем статические данные:
    const workoutData = { id: params.id, title: "Пример тренировки", duration: 60 };
    setWorkout(workoutData);
  }, [params.id]);

  const handleTimerComplete = () => {
    setCompleted(true);
    // Здесь можно добавить логику для начисления монет
  };

  if (!workout) return <p>Загрузка тренировки...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{workout.title}</h1>
      <WorkoutTimer duration={workout.duration * 60} onComplete={handleTimerComplete} />
      {completed && (
        <p className="mt-4 text-green-600 font-semibold">
          Тренировка завершена! Ваши монеты начислены.
        </p>
      )}
    </div>
  );
}
