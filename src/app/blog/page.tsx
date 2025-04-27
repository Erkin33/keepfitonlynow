// app/blog/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,EffectFlip } from "swiper/modules";
import "swiper/css/effect-flip"
import 'swiper/css/effect-flip';
import "swiper/css/effect-fade"
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
        { url: "/BLOG/Anime/Ichigo.avif" },
        { url: "/BLOG/Anime/witch.jpg" },
        { url: "/BLOG/Anime/Zayka.jpg" },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Блог</h1>

      {/* Сетка: 1 колонка на мобилках, 2 — на md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-lg hover:shadow-lg flex flex-col gap-4"
          >
            {/* Слайдер: высота адаптируется под экран */}
            <Swiper
              modules={[EffectFlip, Pagination, Navigation]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              effect={'flip'}
        grabCursor={true}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px]"
            >
              {post.img.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center h-full"
                >
                  <div className="relative w-full h-full rounded-md overflow-hidden">
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

            {/* Текстовая часть */}
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
