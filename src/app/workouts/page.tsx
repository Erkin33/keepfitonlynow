"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function WorkoutsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Загрузка...</p>;

  const workouts = [
    {
      id: 1,
      title: "Кардио тренировка",
      duration: 30,
      bg: 'purple',
      text: 'black',
      type: 'Perfect',
      images: [
        { url: "/Training/Kardio/K1.jpeg", description: "Разминка" },
      ],
    },
    {
      id: 2,
      title: "Йога",
      duration: 30,
      bg: 'yellow',
      text: 'white',
      type: 'New',
      images: [
        { url: "/Training/Yoga/yoga.jpg", description: "Разминка" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 max-w-screen-xl">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-md animate-pulse">
        Ваши тренировки
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {workouts.map((w) => (
          <li
            key={w.id}
            className="relative border-[3px] border-transparent bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-500 hover:scale-105 group overflow-hidden p-4"
            style={{ backgroundImage: "linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)", backgroundSize: "200% 200%", animation: "gradient-border 5s ease infinite" }}
          >
            <Link href={`/workouts/${w.id}`}>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="dark:text-black text-xl font-semibold tracking-wide">
                    {w.title}
                  </h2>
                  <span
                    style={{ backgroundColor: w.bg, color: w.text }}
                    className="text-xs font-bold px-2 py-1 rounded-lg shadow-sm"
                  >
                    {w.type}
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl shadow-md">
                  {w.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={img.description}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ))}
                </div>

                <p className="dark:text-black text-sm mt-2 text-gray-700">
                  ⏱ Длительность: <span className="font-medium">{w.duration} минут</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes gradient-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
