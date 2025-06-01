"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function WorkoutsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Загрузка...</p>;
  //

  // Статические данные тренировок с массивом изображений и описаниями для слайдера
  const workouts = [
    {
      id: 1,
      title: "Кардио тренировка",
      duration: 30,
      bg:'purple',
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
      bg:'yellow',
      text: 'white',
      type: 'New',
      images: [
        { url: "/Training/Yoga/yoga.jpg", description: "Разминка" },
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
              <div className="w-full flex flex-col ">
                <div className="w-full flex flex-row justify-start">
                <h2 className="dark:text-[black] text-2xl font-semibold mb-4 items-center">{w.title}</h2>
                <div className="ml-4 flex mb-4  items-center">
                  <h1 style={{backgroundColor: `${w.bg}`, color: `${w.text}`}} className="dark:text-[black] font-[800] items-center text-[14px] w-[100%] px-1 py-1 rounded-[7px]">
                    {w.type}
                  </h1>
                </div>
                </div>
                {w.images.map((img, index) =>{
                  return(
                    <img key={w.id} src={img.url} />
                  )
                })}
                <p className="dark:text-[black] text-gray-700 mt-2">Длительность: {w.duration} минут</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
