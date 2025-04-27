"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WorkoutTimer from "../../../components/WorkoutTimer";

export default function WorkoutDetail() {
  const params = useParams();
  const [workout, setWorkout] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [finishMessage, setFinishMessage] = useState("");

  useEffect(() => {
    // Пример получения данных тренировки по ID с адаптивными изображениями и описаниями
    let workoutData;
    if (params.id === "1") {
      workoutData = {
        id: 1,
        title: "Кардио тренировка",
        duration: 30,
        images: [
          { url: "/Training/Kardio/K1.jpeg", description: "Разминка" },
          { url: "/Training/Kardio/K2.jpg", description: "Основная часть" },
          { url: "/Training/Kardio/K3.png", description: "Интервалы" },
          { url: "/Training/Kardio/K4.webp", description: "Ускорения" },
          { url: "/Training/Kardio/K5.jpg", description: "Финиш" },
          { url: "/Training/Kardio/K6.png", description: "Растяжка" },
        ],
      };
    } else if (params.id === "2") {
      workoutData = {
        id: 2,
        title: "Йога",
        duration: 30,
        images: [
          { url: "/Training/Yoga/йога1.jpg", description: "Разминка" },
          { url: "/Training/Yoga/йога2.jpeg", description: "Основная часть" },
          { url: "/Training/Yoga/йога3.jpg", description: "Почти финиш" },
          { url: "/Training/Yoga/йога4.jpg", description: "Финиш" },
        ],
      };
    } else if (params.id === "3") {
      workoutData = {
        id: 3,
        title: "Йога",
        duration: 60,
        images: [
          { url: "/Training/Yoga/Y1.jpg", description: "Вход в позу" },
          { url: "/Training/Yoga/Y2.jpg", description: "Основная поза" },
        ],
      };
    } else {
      workoutData = {
        id: Number(params.id),
        title: "Пример тренировки",
        duration: 30,
        images: [{ url: "/Training/default.jpg", description: "Изображение по умолчанию" }],
      };
    }
    setWorkout(workoutData);
  }, [params.id]);

  // Функция, вызываемая при завершении таймера
  const handleTimerComplete = () => {
    setCompleted(true);
  };

  // Функция для ручного завершения тренировки
  const finishWorkout = async () => {
    try {
      const res = await fetch("/api/workouts/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workoutId: workout.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setFinishMessage(data.message);
        setCompleted(true);
      } else {
        setFinishMessage(data.error || data.message);
      }
    } catch (error) {
      setFinishMessage("Ошибка завершения тренировки");
    }
  };

  if (!workout) return <p className="text-center py-8">Загрузка тренировки...</p>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{workout.title}</h1>
      
      {/* Адаптивный слайдер изображений с описаниями */}
      <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }} className="mb-6">
        {workout.images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full flex justify-center items-center bg-gray-100 rounded overflow-hidden">
              <img
                src={img.url}
                alt={`Изображение ${index + 1} для ${workout.title}`}
                className="w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain"
              />
              <p className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs sm:text-sm px-2 py-1 rounded">
                {img.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mb-6">
        <WorkoutTimer
          duration={workout.duration * 60}
          onComplete={handleTimerComplete}
        />
      </div>

      {completed ? (
        <div>
          <p className="mt-4 text-green-600 font-semibold text-center">
            Тренировка завершена! {finishMessage && `(${finishMessage})`}
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          {/* <button
            onClick={finishWorkout}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Завершить тренировку
          </button> */}
        </div>
      )}

      <Link href="/workouts" className="block mt-6 text-blue-600 text-center">
        Вернуться к тренировкам
      </Link>
    </div>
  );
}
