import Link from "next/link";

export default function BlogPage() {
  // Пример статических данных для блога
  const posts = [
    {
      id: 1,
      title: "Первый пост",
      slug: "pervyy-post",
      excerpt: "Краткое описание первого поста.",
    },
    {
      id: 2,
      title: "Второй пост",
      slug: "vtoroy-post",
      excerpt: "Краткое описание второго поста.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Блог</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded hover:shadow">
            <Link href={`/blog/${post.slug}`}>
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
