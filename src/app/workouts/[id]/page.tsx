// app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Post = { id: number; title: string; content: string; createdAt: Date };

const posts: Post[] = [
  {
    id: 1,
    title: "Первый пост",
    content: "<p>Содержимое первого поста.</p>",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    title: "Второй пост",
    content: "<p>Содержимое второго поста.</p>",
    createdAt: new Date("2025-02-01"),
  },
];

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id.toString() }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const post = posts.find((p) => p.id.toString() === params.id);
  return post ? { title: post.title } : { title: "Пост не найден" };
}

export default function BlogPostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const post = posts.find((p) => p.id.toString() === params.id);
  if (!post) notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        Дата публикации: {post.createdAt.toLocaleDateString()}
      </p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
