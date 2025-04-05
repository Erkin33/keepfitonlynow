import { notFound } from "next/navigation";

export default function BlogPostPage({ params }) {
  // Пример статических данных для поста
  const post = {
    title: "Первый пост",
    slug: params.slug,
    content: "<p>Это содержимое первого поста.</p>",
    createdAt: new Date(),
  };

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        Дата публикации: {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
