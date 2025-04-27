// app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

// Статичный массив для демо
const posts: Post[] = [
  {
    id: 1,
    title: "Первый пост",
    content: "<p>Это содержимое первого поста.</p>",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    title: "Второй пост",
    content: "<p>Это содержимое второго поста.</p>",
    createdAt: new Date("2025-02-01"),
  },
];

// Для SSG: генерим все возможные id
export function generateStaticParams() {
  return posts.map(post => ({
    id: post.id.toString(),
  }));
}

// (опционально) Заголовок страницы
export function generateMetadata({ params }): Metadata {
  const post = posts.find(p => p.id.toString() === params.id);
  if (!post) return { title: "Пост не найден" };
  return { title: post.title };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        Дата публикации: {post.createdAt.toLocaleDateString()}
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
