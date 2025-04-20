// src/app/api/user/route.js
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET;

export async function PATCH(request) {
  try {
    // Получаем токен, который NextAuth поставляет в запросе
    const token = await getToken({ req: request, secret: SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // token.id должен содержать идентификатор пользователя (убедитесь, что вы его добавляете в jwt callback NextAuth)
    const userId = token.id;
    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
