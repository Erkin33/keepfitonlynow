// src/app/api/blog/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, slug, content, authorId } = await request.json();
    const post = await prisma.blogPost.create({
      data: { title, slug, content, authorId },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
