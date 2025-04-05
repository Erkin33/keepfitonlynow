// src/app/api/blog/[slug]/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) return NextResponse.json({ error: "Пост не найден" }, { status: 404 });
    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
