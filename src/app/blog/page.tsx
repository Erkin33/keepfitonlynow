"use client"
// app/blog/page.tsx
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// не забудьте установить swiper: npm i swiper
import "swiper/css";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Сет Роллинс, Пол Хейман и Брон Брейкер появятся на Raw; Назначен женский матч и другое",
      excerpt: "Краткое описание первого поста.",
      img: "",
    },
    {
      id: 2,
      title: "Второй пост",
      excerpt: "Краткое описание второго поста.",
      img: "",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Блог</h1>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        // при желании можно добавить breakpoints, navigation, pagination и т. д.
      >
        {posts.map((post) => (
          
            <div className="border p-4 rounded hover:shadow">
              <Link href={`/blog/${post.id}`}>
                <div>
                  <SwiperSlide key={post.id}>
                    <img src={post.img} />
                  </SwiperSlide>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
              </Link>
            </div>
          
        ))}
      </Swiper>
    </div>
  );
}
