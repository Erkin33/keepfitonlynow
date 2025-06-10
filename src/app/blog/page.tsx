"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip } from "swiper/modules";
import "swiper/css/effect-flip";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title:
        "Сет Роллинс, Пол Хейман и Брон Брейкер появятся на Raw; Назначен женский матч и другое",
      excerpt: "Краткое описание первого поста.",
      img: [{ url: "/BLOG/WWE/RAW.webp" }],
    },
    {
      id: 2,
      title: "Любите аниме? Вам сюда!",
      excerpt: "Самые свежие новости!",
      img: [
        { url: "/BLOG/Anime/Ha.webp" },
        { url: "/BLOG/Anime/ichigo.avif" },
        { url: "/BLOG/Anime/witch.jpg" },
        { url: "/BLOG/Anime/Zayka.jpg" },
      ],
    },
  ];

  const { data: session, status } = useSession();
  if (status === "loading") return <p>Загрузка...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-md">
        Добро пожаловать в блог KeepfitOnly!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.01] hover:shadow-purple-500/30 transition-transform duration-500 border border-gray-200 dark:border-gray-700"
          >
            <Swiper
              modules={[EffectFlip, Pagination, Navigation]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              effect={"flip"}
              grabCursor={true}
              className="w-full h-72 sm:h-80 md:h-96 lg:h-[500px]"
            >
              {post.img.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center h-full"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.url}
                      alt={`${post.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="p-6 space-y-3">
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold dark:text-white text-gray-800 hover:text-purple-500 transition-colors duration-300">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
