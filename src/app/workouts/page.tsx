"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function WorkoutsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Загрузка...</p>;
  if (!session)
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="mb-4">
          Для просмотра тренировок необходимо войти в систему.
        </p>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Войти
        </Link>
      </div>
    );

  // Статические данные тренировок с массивом изображений и описаниями для слайдера
  const workouts = [
    {
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
    },
    // Дополнительные тренировки можно добавить аналогично.
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Ваши тренировки</h1>
      <ul className="space-y-8">
        {workouts.map((w) => (
          <li
            key={w.id}
            className="border rounded-lg shadow hover:shadow-xl transition duration-300 p-4"
          >
            <Link href={`/workouts/${w.id}`}>
              <div>
                <h2 className="text-2xl font-semibold mb-4">{w.title}</h2>
                {/* Слайдер изображений */}
                <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                  {w.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full flex justify-center items-center bg-gray-100 rounded overflow-hidden">
                        <img
                          src={img.url}
                          alt={`Изображение ${index + 1} для ${w.title}`}
                          className="w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain"
                        />
                        <p className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs sm:text-sm px-2 py-1 rounded">
                          {img.description}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <p className="text-gray-700 mt-2">Длительность: {w.duration} минут</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
